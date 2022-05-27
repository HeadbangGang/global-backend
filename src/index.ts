import express from 'express'
import path from 'path'

// Routes
import pokedexRouter from './routes/pokedex'
import portfolioRouter from './routes/portfolio'

const app = express()
const PORT = process.env.PORT || 3001

app.use('/pokedex', pokedexRouter)
app.use('/portfolio', portfolioRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/landing-page/landing-page.html'))
})

app.get('/.well-known/acme-challenge/3qTILZS-VwEvyOi5OdojhxnCuq81YOyCxLUaBf3Qb_k', (req, res) => {
    res.send('3qTILZS-VwEvyOi5OdojhxnCuq81YOyCxLUaBf3Qb_k.3PIIheEYwvq4D-Um5d4P_WVtul2c5Sh_j11TkQqatKs')
})

app.get('/.well-known/acme-challenge/aM7aHZTK_Jhd-jwbJk96k0RvRnsMscCiX3a3SMmikWs', (req, res) => {
    res.send('aM7aHZTK_Jhd-jwbJk96k0RvRnsMscCiX3a3SMmikWs.3PIIheEYwvq4D-Um5d4P_WVtul2c5Sh_j11TkQqatKs')
})
app.listen(PORT, () => {
    console.info(`Current Environment: ${process.env.CONFIG_ENV || 'production'}`)
    console.info(`server is running on port: ${PORT}`)
})
