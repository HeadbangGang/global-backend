import express from 'express'
import { AWSError, S3 } from 'aws-sdk'

interface S3DataInterface {
    Body: any
}

interface S3Params extends S3.GetObjectRequest {
    Bucket: string
}

const s3 = new S3({
    region: 'us-east-2',
    signatureVersion: 'v4'
})

const s3Params: S3Params = { Bucket: process.env.S3_BUCKET, Key: null }

export const fetchResumeFromS3 = async (req: express.Request, res: express.Response) => {
    s3Params.Key = 'resume.pdf'
    await S3DataFetch(req, res)
}

export const fetchPdfWorker = async (req: express.Request, res: express.Response) => {
    s3Params.Key = 'pdf-worker.min.js'
    await S3DataFetch(req, res)
}

const S3DataFetch = async (req: express.Request, res: express.Response) => {
    await s3.getObject(s3Params, (err: AWSError, data: S3DataInterface) => {
        if (err) {
            res.end()
        }
        res.write(Buffer.from(data.Body, 'base64').toString('ascii'))
        res.end()
    })
}
