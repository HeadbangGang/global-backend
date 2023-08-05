import express from 'express'
import { URI } from '../helpers/constants'
import { Abilities, AbilityResponse, EffectEntries, NationalPokedex, PokeApiListResponse, PokeApiPokemonResponse, SpeciesData, Stats, StatsResponse, Types } from '../interfaces/pokeapi'

export interface ListBuilderParams {
    limit: number
    offset: number
}

interface PokemonData {
    default_image?: string | null
    default_image_shiny?: string | null
    id: number
    name: string
    speciesData: SpeciesData
    sprites: any[]
    types: Types[]
}

interface ListResponseBody {
    params: ListBuilderParams | null
    pokemonData: PokemonData[]
}

const pokemonDataBuilder = async (id: string) => {
    const pokemonResponse = await fetch(URI.POKEAPI + '/pokemon/' + id)
    const pokemonJson : PokeApiPokemonResponse = await pokemonResponse.json()

    const { name } = pokemonJson

    const speciesDataRes = await fetch(URI.POKEAPI + '/pokemon-species/' + name)
    const species = await speciesDataRes.json()

    const sprites = {
        default: pokemonJson.sprites.other['official-artwork'].front_default,
        shiny: pokemonJson.sprites.other['official-artwork'].front_shiny
    }

    const types = pokemonJson.types.reduce((acc: string[], item: Types) => {
        acc.push(item.type.name)
        return acc
    }, [])

    const abilitiesResponses = await Promise.all(pokemonJson.abilities.map(async (arr) => {
        const abilityResponse = await fetch(arr.ability.url)
        const abilityJson: AbilityResponse = await abilityResponse.json()
        return abilityJson
    })) as unknown as AbilityResponse[]

    const abilities = abilitiesResponses.reduce((acc: { [key: string]: AbilityResponse }, item: AbilityResponse) => {
        acc[item.name] = item

        const { effect, short_effect } = item.effect_entries?.find(effectEntry => effectEntry.language.name = 'en') as EffectEntries
        acc[item.name].descriptions = {
            effect,
            shortEffect: short_effect
        }

        delete acc[item.name].effect_changes
        delete acc[item.name].effect_entries
        delete acc[item.name].flavor_text_entries
        delete acc[item.name].names
        delete acc[item.name].pokemon
        delete acc[item.name].generation

        return acc
    }, {})

    const stats = pokemonJson.stats.reduce((acc: StatsResponse, item: Stats) => {
        acc[item.stat.name] = {
            name: item.stat.name,
            baseStat: item.base_stat,
            effort: item.effort
        }
        return acc
    }, {})

    const responseBody = {
        ...pokemonJson,
        abilities,
        sprites,
        species,
        stats,
        types
    }

    return responseBody
}

export const listBuilder = async (request: express.Request<unknown, unknown, unknown, ListBuilderParams>, response: express.Response) => {
    const { limit, offset } = request.query
    const url = `${URI.POKEAPI}/pokemon` + ((limit || offset) ? `?limit=${limit}&offset=${offset}` : '?limit=100')

    const res = await fetch(url)
    const json : PokeApiListResponse = await res.json()

    const { results, next } = json

    let params : ListBuilderParams | null = null

    if (next) {
        params = Object.fromEntries(new URLSearchParams(next.split('?')[1])) as unknown as ListBuilderParams
    }

    if (results.length) {
        const pokemonIds = results.map(({ name }) => name)
        const pokemonData = (await Promise.all(pokemonIds.map(async pokemonId => await pokemonDataBuilder(pokemonId)))).sort((a, b) => a.id - b.id) as unknown as PokemonData[]

        const responseBody: ListResponseBody = { pokemonData, params }
        response.status(200).json(responseBody)
    }
}

export const countBuilder = async (_request: express.Request, response: express.Response) => {
    try {
        const res = await fetch(`${URI.POKEAPI}/pokedex/1`)
        const json : NationalPokedex = await res.json()

        const count = json.pokemon_entries.length - 1

        response.status(200).json({ count })
    } catch(err : unknown) {
        response.sendStatus(400)
    }
}
