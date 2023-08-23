import express from 'express'
import { URI } from '../helpers/constants'
import { AbilityResponse, EffectEntries, NationalPokedex, PokeApiListResponse, PokeApiGenerationResponse, PokeApiPokemonResponse, SpeciesData, Stats, StatsResponse, Types, DefaultPokeApiDataObject } from '../interfaces/pokeapi'

export interface PokeApiListParams {
    limit?: string
    offset?: string
    generation?: string
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
    params: PokeApiListParams | null
    pokemonData: PokemonData[]
}

const sortPokemonById = (pokemonList: any[]): PokemonData[] => {
    return pokemonList.sort((a: PokemonData, b: PokemonData) => a.id - b.id)
}

const fetchPokemonData = async (id: string): Promise<PokeApiPokemonResponse> => {
    const pokemonResponse = await fetch(URI.POKEAPI + '/pokemon/' + id)
    const pokemonJson: PokeApiPokemonResponse = await pokemonResponse.json()

    return pokemonJson
}

const pokemonDataBuilder = async (id: string) => {
    const pokemonJson = await fetchPokemonData(id)

    const { name } = pokemonJson

    const speciesDataRes = await fetch(URI.POKEAPI + '/pokemon-species/' + name)
    const species = await speciesDataRes.json()

    const sprites = {
        default: pokemonJson.sprites.other['official-artwork'].front_default,
        shiny: pokemonJson.sprites.other['official-artwork'].front_shiny
    }

    const types = pokemonJson.types.reduce((acc: string[], item: Types) => {
        return [...acc, item.type.name]
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

export const listBuilder = async (request: express.Request<unknown, unknown, unknown, PokeApiListParams>, response: express.Response) => {

    const isPokemonListParams = (params: PokeApiListParams): PokeApiListParams => {
        if (params.limit && typeof params.limit !== 'string') {
            throw new Error('limit is not a string')
        }
        if (params.offset && typeof params.offset !== 'string') {
            throw new Error('offset is not a string')
        }
        if (params.generation && typeof params.generation !== 'string') {
            throw new Error('generation is not a string')
        }

        return {
            generation: params.offset,
            limit: params.limit,
            offset: params.offset
        }

    }

    const builtParams = new URLSearchParams(isPokemonListParams(request.query) as Record<string, string>) as any as PokeApiListParams
    let url: string

    if (request.query.generation) {
        url = `${URI.POKEAPI}/generation/${request.query.generation}`
    } else {
        url = `${URI.POKEAPI}/pokemon` + (Object.keys(builtParams).length ? `/?${builtParams}` : '')
    }


    const res = await fetch(url)

    if (request.query.generation) {
        const json: PokeApiGenerationResponse = await res.json()

        const { pokemon_species: pokemonSpecies } = json

        const pokemonData = await Promise.all(pokemonSpecies.map(async (data) => {
            return await fetch(data.url)
                .then(resp => resp.json())
                .then((resp: PokeApiGenerationResponse) => {
                    console.log(resp)
                    return {
                        id: resp.id,
                        name: resp.name
                    }
                })
        }))

        const sortedPokemon = sortPokemonById(pokemonData)

        response.status(200).json(sortedPokemon)
    } else {
        const json: PokeApiListResponse = await res.json()

        const { results, next } = json

        let newParams: PokeApiListParams | null = null

        if (next) {
            newParams = Object.fromEntries(new URLSearchParams(next.split('?')[1]))
        }

        if (results.length) {
            const pokemonData = await Promise.all(results.map(async (data) => await pokemonDataBuilder(data.name)))
            const sortedPokemon = sortPokemonById(pokemonData)

            const responseBody: ListResponseBody = { pokemonData: sortedPokemon, params: newParams }
            response.status(200).json(responseBody)
        }
    }
}

export const pokemon = async (request: express.Request, response: express.Response): Promise<void> => {
    const { name } = request.params

    const json = await pokemonDataBuilder(name)
    response.status(200).send(json)
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
