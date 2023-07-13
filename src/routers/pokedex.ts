import express from 'express'
// import cors from 'cors'
// import { corsConfig } from '../configs/cors-config'
import { countBuilder, listBuilder, type ListBuilderParams } from '../builders/pokedex-builders'

const pokedexRouter = express.Router()

// pokedexRouter.options('*', cors(corsConfig))
// pokedexRouter.use(cors(corsConfig))
pokedexRouter.use(express.json())

pokedexRouter.get('/count', async (request: express.Request, response: express.Response) => await countBuilder(request, response))
pokedexRouter.get('/pokemon/list', async (request: express.Request<unknown, unknown, unknown, ListBuilderParams>, response: express.Response) => await listBuilder(request, response))

export default pokedexRouter
