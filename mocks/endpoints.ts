import express from 'express'
export const router: express.Router = express.Router()
import { pokemonRouter } from './pokemon/routes'

// Pokemon
router.use('/api/v2', (req, res, next) => pokemonRouter(req, res, next))
