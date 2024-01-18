import express from 'express'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export interface S3RequestParams {
    fileName: string
}

export const s3 = new S3Client({
    region: 'us-east-2'
})

export const fetchFileFromS3 = async (request: express.Request<unknown, unknown, unknown, S3RequestParams>) : Promise<Blob> => {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: request.query.fileName
    })

    const awsAssetUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })
    const res = await fetch(awsAssetUrl)
    const blob = await res.blob()

    return blob
}
