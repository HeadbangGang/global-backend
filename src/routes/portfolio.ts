import express from 'express'
import cors from 'cors'
import { corsConfig } from '../configs/cors-config'
import {
    contactEmailBuilder,
    projectsBuilder,
    sendFileFromS3
} from '../builders/portfolio-builders'

const portfolioRouter = express.Router()

portfolioRouter.options('*', cors(corsConfig))
portfolioRouter.use(cors(corsConfig))
portfolioRouter.use(express.json())

portfolioRouter.get('/projects', (req: express.Request, res:express.Response) => projectsBuilder(req, res))
portfolioRouter.post('/contact', async (req: express.Request, res: express.Response) => await contactEmailBuilder(req, res))
portfolioRouter.get('/asset', async (req: express.Request, res: express.Response) => await sendFileFromS3(req, res))

export default portfolioRouter
