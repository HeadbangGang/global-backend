import express from 'express'
import cors from 'cors'
import { corsConfig } from './configs/cors-config'

// Routes
import handlePokemonData from './routes/pokedex'

const app = express()
const PORT = 3001

app.options('*', cors(corsConfig))
app.use(cors(corsConfig))

app.use(handlePokemonData)

app.listen(PORT, () => {
    console.log(`The server has been started on port: ${PORT}`)
})