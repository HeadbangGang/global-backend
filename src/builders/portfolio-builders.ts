import express from 'express'
import { EmailBodyInterface, sendEmail } from '../helpers/email'
import { fetchFileFromS3, type S3RequestParams } from '../helpers/aws-s3'

interface EmailResponse {
    accepted: string[]
    rejected: string[]
    envelopeTime: number
    messageTime: number
    messageSize: number
    response: string
    envelope: {
        from: string
        to: string[]
    }
    messageId: string
}

export const projectsBuilder = async (request: express.Request<unknown, unknown, unknown, S3RequestParams>, response: express.Response) : Promise<void> => {
    request.query.fileName = 'projects.json'
    const dataBlob = await fetchFileFromS3(request)
    response.type(dataBlob.type)
    dataBlob.arrayBuffer()
        .then((buf: ArrayBuffer) : void => {
            response.send(Buffer.from(buf))
        })
}

export const contactEmailBuilder = async (request: express.Request<EmailBodyInterface>, response: express.Response) : Promise<void> => {
    const emailResponse: EmailResponse = await sendEmail(request)

    if (emailResponse.accepted.length) {
        response.sendStatus(200)
    } else {
        response.sendStatus(500)
    }
}

export const sendFileFromS3 = async (request: express.Request<unknown, unknown, unknown, S3RequestParams>, response: express.Response) : Promise<void> => {
    const dataBlob = await fetchFileFromS3(request)
    response.type(dataBlob.type)
    dataBlob.arrayBuffer()
        .then((buf: ArrayBuffer) : void => {
            response.send(Buffer.from(buf))
        })
}
