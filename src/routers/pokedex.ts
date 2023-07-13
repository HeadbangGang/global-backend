import express from 'express'
import { countBuilder, listBuilder, type ListBuilderParams } from '../builders/pokedex-builders'

const pokedexRouter = express.Router()

pokedexRouter.use(express.json())

pokedexRouter.get('/count', async (request: express.Request, response: express.Response) => await countBuilder(request, response))
pokedexRouter.get('/pokemon/list', async (request: express.Request<unknown, unknown, unknown, ListBuilderParams>, response: express.Response) => await listBuilder(request, response))

export default pokedexRouter
