import express from 'express'
import cors from 'cors'
import { corsConfig } from '../configs/cors-config'
import {
    contactEmailBuilder,
    projectsBuilder,
    sendPdfWorker,
    sendResume
} from '../builders/portfolio-builders'

const portfolioRouter = express.Router()

portfolioRouter.options('*', cors(corsConfig))
portfolioRouter.use(cors(corsConfig))
portfolioRouter.use(express.json())

portfolioRouter.get('/projects', (req: express.Request, res:express.Response) => projectsBuilder(req, res))
portfolioRouter.post('/contact', async (req: express.Request, res: express.Response, next:express.NextFunction) => await contactEmailBuilder(req, res))
portfolioRouter.get('/pdf-worker', (req: express.Request, res: express.Response) => sendPdfWorker(req, res))
portfolioRouter.get('/resume', async (req: express.Request, res: express.Response) => await sendResume(req, res))

export default portfolioRouter
