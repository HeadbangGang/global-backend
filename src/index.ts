import express from 'express'

// Routes
import pokedexRouter from './routes/pokedex'
import portfolioRouter from './routes/portfolio'
import { s3 } from './helpers/aws-s3'
import { AWSError, S3 } from 'aws-sdk'

const app = express()
const PORT = process.env.PORT || 3001

app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

app.get('/', async (req:express.Request, res: express.Response) => {
    await s3.getObject({ Bucket: process.env.S3_BUCKET, Key: 'landing-page.html' }, (err: AWSError, data) => {
        if (!err) {
            res.send(data.Body.toString())
        } else {
            res.sendStatus(401)
        }
    })
})

app.listen(PORT, () => {
    console.info(`Current Environment: ${process.env.CONFIG_ENV || 'production'}`)
    console.info(`server is running on port: ${PORT}`)
})
