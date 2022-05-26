import express from 'express'
import path from 'path'

// Routes
import pokedexRouter from './routes/pokedex'
import portfolioRouter from './routes/portfolio'

const app = express()
const PORT = process.env.PORT || 3001

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/landing-page/landing-page.html'))
})

app.listen(PORT, () => {
    console.info(`Current Environment: ${process.env.CONFIG_ENV || 'production'}`)
    console.info(`server is running on port: ${PORT}`)
})
