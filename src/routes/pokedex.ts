import express from 'express'
import axios from 'axios'
const pokedexRoutes = express()
import { CountResponse, ErrorResponse } from '../interfaces'

const handlePokemonData = () => {
    pokedexRoutes.get('/data/:pokemon', async (req: express.Request, res: express.Response, next) => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemon}`)
            .then(resp => {
                return res.send(resp.data)
            })
            .catch((err: ErrorResponse) => {
                const { message, name, url = err.config.url } = err
                return res.status(404).send({ message, name, url })
            })
        next()
    })

    pokedexRoutes.get('/count', async (req: express.Request, res: express.Response, next) => {
        await axios.get('https://pokeapi.co/api/v2/pokedex/1')
            .then ((resp: CountResponse) => {
                resp = resp.data
                const count = resp.pokemon_entries[resp.pokemon_entries.length - 1].entry_number
                return res.status(200).json({ count })
            })
            .catch(() => {
                return res.sendStatus(404)
            })
        next()
    })
}

export default handlePokemonData