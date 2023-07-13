import express from 'express'
import {
    contactEmailBuilder,
    projectsBuilder,
    sendFileFromS3
} from '../builders/portfolio-builders'
import { S3RequestParams } from '../helpers/aws-s3'
import { EmailBodyInterface } from '../helpers/email'

const portfolioRouter = express.Router()

portfolioRouter.use(express.json())

portfolioRouter.get('/projects', async (request: express.Request<unknown, unknown, unknown, S3RequestParams>, response: express.Response) => await projectsBuilder(request, response))
portfolioRouter.post('/contact', async (request: express.Request<EmailBodyInterface>, response: express.Response) => await contactEmailBuilder(request, response))
portfolioRouter.get('/asset', async (request: express.Request<unknown, unknown, unknown, S3RequestParams>, response: express.Response) => await sendFileFromS3(request, response))

export default portfolioRouter
