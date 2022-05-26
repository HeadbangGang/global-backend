import express from 'express'
import { AWSError, S3 } from 'aws-sdk'

interface S3DataInterface {
    Body: any
}

interface S3Params extends S3.GetObjectRequest {
    Bucket: string
    Expires: number
}

const s3 = new S3({
    region: 'us-east-2',
    signatureVersion: 'v4'
})

const s3Params: S3Params = { Bucket: process.env.S3_BUCKET, Key: null, Expires: 60 }

export const fetchFileFromS3 = (req: express.Request) => {
    const { fileName }: { fileName?: string } = req.query
    s3Params.Key = fileName
    return S3DataFetch()
}

const S3DataFetch = () => s3.getSignedUrl('getObject', s3Params)
