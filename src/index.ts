import express from 'express'

// Routes
import pokedexRouter from './routes/pokedex'

const app = express()
const PORT = 3001

app.use('/pokedex', pokedexRouter)

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server has been started on port: ${PORT}`)
})