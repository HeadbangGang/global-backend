import express from 'express'
import path from 'path'
const fs = require('fs')

// Routes
import pokedexRouter from './routes/pokedex'
import portfolioRouter from './routes/portfolio'

const app = express()
const PORT = process.env.PORT || 3001

app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './landing-page/landing-page.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './landing-page/landing-page.html'))
})

app.listen(PORT, () => {
    console.info(`Current Environment: ${process.env.CONFIG_ENV || 'production'}`)
    console.info(`server is running on port: ${PORT}`)
})
