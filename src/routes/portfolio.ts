import express from 'express'
import cors from 'cors'
import { corsConfig } from '../configs/cors-config'
import {
    projectsBuilder
} from '../builders/portfolio-builders'

const portfolioRouter = express.Router()

portfolioRouter.options('*', cors(corsConfig))
portfolioRouter.use(cors(corsConfig))
portfolioRouter.use(express.json())

portfolioRouter.get('/projects', (req: express.Request, res:express.Response, next: express.NextFunction) => projectsBuilder(req, res, next))

export default portfolioRouter
