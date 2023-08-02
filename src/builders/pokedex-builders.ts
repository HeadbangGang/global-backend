import express from 'express'
import { URI } from '../helpers/constants'
import { NationalPokedex, PokeApiListResponse, PokeApiPokemonResponse, Types } from '../interfaces/pokeapi'

export interface ListBuilderParams {
    limit: number
    offset: number
}

interface PokemonData {
    default_image?: string | null
    default_image_shiny?: string | null
    id: number
    name: string
    sprites: any[]
    types: Types[]
}

interface ListResponseBody {
    params: ListBuilderParams | null
    pokemonData: PokemonData[]
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
        const pokemonDataUrls = results.map(({ name }) => `${URI.POKEAPI}/pokemon/${name}`)
        const pokemonData : PokemonData[] = []

        return Promise.all(pokemonDataUrls.map(async pokemonUrl => {
            const pokemonResponse = await fetch(pokemonUrl)
            const pokemonJson : PokeApiPokemonResponse = await pokemonResponse.json()

            const { name, id, sprites, types } = pokemonJson
            const { versions, front_default, front_shiny } = sprites

            const sortedSprites = Object.keys(sprites).reduce((acc: any[], key: string) => {
                const sprite = sprites[key as keyof typeof sprites]

                if (!!sprite && !(sprite === 'other' || sprite === 'versions')) {
                    acc.push({ [key]: sprite })
                }

                return acc
            }, [])

            const additionalSprites = Object.keys(versions).map((generation) => versions[generation])
            if (additionalSprites.length) {
                additionalSprites.forEach((version) => {
                    Object.keys(version).forEach((game) => {
                        const currentGameData = version[game]
                        if (game !== 'icons' && currentGameData.front_default) {
                            sortedSprites.push({ [game]: version[game] })
                        }
                    })
                })
            }

            pokemonData.push({
                id,
                name,
                default_image: front_default,
                default_image_shiny: front_shiny,
                sprites: sortedSprites,
                types
            })
        }))
            .then(() => {
                const responseBody : ListResponseBody = { pokemonData: pokemonData.sort((a, b) => a.id - b.id), params }
                response.status(200).json(responseBody)
            })
            .catch(() => {
                response.sendStatus(400)
            })
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
