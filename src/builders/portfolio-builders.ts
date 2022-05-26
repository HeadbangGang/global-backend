import express from 'express'
import { sendEmail } from '../helpers/email'
import { EmailResponseInterface } from '../interfaces'
import { fetchFileFromS3 } from '../helpers/aws-s3'
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

export const sendFileFromS3 = async (req: express.Request, res: express.Response) => {
    const dataBlob = await fetchFileFromS3(req) as Blob
    res.type(dataBlob.type)
    dataBlob.arrayBuffer()
        .then((buf) => {
            res.send(Buffer.from(buf))
        })
}
