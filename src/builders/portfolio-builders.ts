import express from 'express'
import { sendEmail } from '../helpers/email'
import { EmailResponseInterface } from '../interfaces'
import { fetchFileFromS3 } from '../helpers/aws-s3'

export const projectsBuilder = async (req: express.Request, res: express.Response) => {
    req.query.fileName = 'projects.json'
    const dataBlob = await fetchFileFromS3(req) as Blob
    res.type(dataBlob.type)
    dataBlob.arrayBuffer()
        .then((buf: ArrayBuffer) => {
            res.send(Buffer.from(buf))
        })
}

export const contactEmailBuilder = async (req: express.Request, res: express.Response) => {
    const emailResponse = await sendEmail(req) as EmailResponseInterface

    if (emailResponse.accepted.length) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

export const sendFileFromS3 = async (req: express.Request, res: express.Response) => {
    const dataBlob = await fetchFileFromS3(req) as Blob
    res.type(dataBlob.type)
    dataBlob.arrayBuffer()
        .then((buf: ArrayBuffer) => {
            res.send(Buffer.from(buf))
        })
}
