import express from 'express'
import { expressJwtSecret } from 'jwks-rsa'
const { expressjwt: jwt } = require('express-jwt')

// Routes
import pokedexRouter from './routes/pokedex'
import portfolioRouter from './routes/portfolio'
import { s3 } from './helpers/aws-s3'
import { AWSError } from 'aws-sdk'

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', async (req:express.Request, res: express.Response) => {
    await s3.getObject({ Bucket: process.env.S3_BUCKET, Key: 'landing-page.html' }, (err: AWSError, data) => {
        if (!err) {
            res.send(data.Body.toString())
        } else {
            res.sendStatus(401)
        }
    })
})

const checkJwt = jwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-fsldf8y6.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://api.taydenflitcroft.com',
    issuer: 'https://dev-fsldf8y6.us.auth0.com/',
    algorithms: ['RS256']
})

if (process.env.NODE_ENV === 'production') {
    app.use(checkJwt)
}
app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

app.listen(PORT, () => {
    console.info(`Current Environment: ${process.env.CONFIG_ENV || 'production'}`)
    console.info(`server is running on port: ${PORT}`)
})
