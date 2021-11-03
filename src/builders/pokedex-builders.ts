import express from 'express'
import axios, { AxiosResponse } from 'axios'
import {
    CountResponse,
    DataContent,
    // ErrorResponse,
    ListBuilderRequest,
    PokemonListResponse,
    ResultsContent
} from '../interfaces'
import { pokedexUri } from '../configs/config'

export const listBuilder = async (req: ListBuilderRequest, res: express.Response, next: express.NextFunction) => {
    console.log(pokedexUri)
    const url = req.body?.nextUrl || `${pokedexUri}/api/v2/pokemon?limit=100`
    let results: DataContent | ResultsContent[] = []
    let nextUrl: string
    await axios.get(url)
        .then((resp: PokemonListResponse) => {
            results = resp.data.results
            nextUrl = resp.data.next
        })
        .catch(() => {
            res.sendStatus(404)
        })
    if (results.length > 0) {
        const pokemonDataReq: Promise<AxiosResponse>[] = results.map((item: ResultsContent) => {
            return axios.get(`${pokedexUri}/api/v2/pokemon/${item.name}`)
        })
        await Promise.all(pokemonDataReq)
            .then((resp: PokemonListResponse[]) => {
                const pokemonData = resp.map(item => {
                    const { id, sprites, types, name } = item.data
                    const response = { id, name, img: sprites.front_default, img_shiny: sprites.front_shiny, types }
                    return response
                })
                res.json({ nextUrl, pokemonData })
            })
            .catch(() => {
                res.status(400).send('Failed on group promise')
            })
        next()
    }
}

export const countBuilder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await axios.get(`${pokedexUri}/api/v2/pokedex/1`)
        .then((resp: CountResponse) => {
            resp = resp.data
            const count = resp.pokemon_entries[resp.pokemon_entries.length - 1].entry_number
            res.status(200).json({ count })
        })
        .catch(() => {
            res.sendStatus(404)
        })
    next()
}

// export const dataBuilder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemon}`)
//         .then(resp => {
//             return res.send(resp.data)
//         })
//         .catch((err: ErrorResponse) => {
//             const { message, name, url = err.config.url } = err
//             return res.status(404).send({ message, name, url })
//         })
//     next()
// }