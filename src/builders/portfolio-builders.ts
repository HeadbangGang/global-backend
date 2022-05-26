import express from 'express'
import { sendEmail } from '../helpers/email'
import { EmailResponseInterface } from '../interfaces'
import { fetchPdfWorker, fetchResumeFromS3 } from '../helpers/aws-s3'
const fs = require('fs')
const path = require('path')
const projects = require('../static-responses/portfolio-projects')

export const projectsBuilder = (req: express.Request, res: express.Response) => res.status(200).send(projects)

export const contactEmailBuilder = async (req: express.Request, res: express.Response) => {
    const emailResponse = await sendEmail(req) as EmailResponseInterface

    if (emailResponse.accepted.length) {
        res.status(200).send({ emailSentSuccess: true })
    } else {
        res.status(400).send({ emailSentSuccess: false })
    }
}

export const sendPdfWorker = async (req: express.Request, res: express.Response) => await fetchPdfWorker(req, res)
export const sendResume = async (req: express.Request, res: express.Response) => await fetchResumeFromS3(req ,res)
