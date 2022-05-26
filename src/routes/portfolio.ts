import express from 'express'
import cors from 'cors'
import { corsConfig } from '../configs/cors-config'
import {
    contactEmailBuilder,
    projectsBuilder,
    sendFileFromS3
} from '../builders/portfolio-builders'
import { fetchFileFromS3 } from '../helpers/aws-s3'

const portfolioRouter = express.Router()

portfolioRouter.options('*', cors(corsConfig))
portfolioRouter.use(cors(corsConfig))
portfolioRouter.use(express.json())

portfolioRouter.get('/projects', (req: express.Request, res:express.Response) => projectsBuilder(req, res))
portfolioRouter.post('/contact', async (req: express.Request, res: express.Response) => await contactEmailBuilder(req, res))
portfolioRouter.get('/asset', (req: express.Request, res: express.Response) => sendFileFromS3(req, res))

export default portfolioRouter
