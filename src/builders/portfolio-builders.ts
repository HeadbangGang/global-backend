import express from 'express'
import { sendEmail } from '../helpers/email'
import { EmailResponseInterface } from '../interfaces'
const fs = require('fs')
const path = require('path')
const projects = require('../static-responses/portfolio-projects')

export const projectsBuilder = (req: express.Request, res: express.Response, next: express.NextFunction) => res.status(200).send(projects)

export const contactEmailBuilder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const emailResponse = await sendEmail(req, res, next) as EmailResponseInterface

    if (emailResponse.accepted.length) {
        res.status(200).send({ emailSentSuccess: true })
    } else {
        res.status(400).send({ emailSentSuccess: false })
    }
}
