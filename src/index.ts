import express from 'express'
import { auth } from 'express-oauth2-jwt-bearer'
import handlebars from 'handlebars'
import path from 'path'
import fs from 'fs'
import cors from 'cors'

import 'dotenv/config'

// Routes
import pokedexRouter from './routers/pokedex'
import portfolioRouter from './routers/portfolio'

const app = express()
const PORT = process.env.PORT || 3001
const ENV = process.env.NODE_ENV || 'production'

app.get('/', async (_request: express.Request, response: express.Response) => {
    const landingPage = fs.readFileSync(path.join(__dirname, './html/landing-page.hbs')).toString()
    const landingPageTemplate = handlebars.compile(landingPage)

    if (!landingPage) {
        response.sendStatus(500)
    }

    if (!response.headersSent) {
        response.status(200).send(landingPageTemplate(null))
    }
})

const checkJwt = auth({
    audience: 'https://api.taydenflitcroft.com',
    issuerBaseURL: 'https://dev-fsldf8y6.us.auth0.com/',
})

app.use(
    cors({
        origin: (_origin, callback) => {
            const allowedOrigins = ['taydenflitcroft.com']
            if (allowedOrigins.includes(_origin as string) || !origin) {
                callback(null, true)
            } else {
                callback(new Error('CORS policy violation'), false)
            }
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
        credentials: true
    })
)

if (ENV === 'production') {
    app.use(checkJwt)
}

// Routers
app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

// Start App
app.listen(PORT, () => {
    console.info(`Current Environment: ${ENV}`)
    console.info(`server is running on port: ${PORT}`)
})
