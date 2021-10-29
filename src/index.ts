import express from 'express'

// Routes
import pokedexRouter from './routes/pokedex'

const app = express()
const PORT = 3001

app.use('/pokedex', pokedexRouter)

app.get('/', (req, res) => {
    res.status(200).send('Hello World. :)')
})

app.listen(PORT, () => {
    console.log(`The server has been started on port: ${PORT}`)
})