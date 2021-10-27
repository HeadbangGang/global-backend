const express = require('express')
const axios = require('axios').default
const cors = require('cors');

const app = express()
const PORT = 3001

const options = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};

app.options('*', cors(options));
app.use(cors(options));

app.get('/pokemon/:pokemon/data', async (req, res, next) => {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemon}`)
    .then(resp => {
        res.send(resp.data)
    })
    .catch(err => {
        const {message, name, url = err.config.url} = err
        res.status(404).send({message, name, url})
    })
})

app.get('/pokemon/count', async (req, res) => {
    await axios.get('https://pokeapi.co/api/v2/pokedex/1')
    .then (resp => {
    resp = resp.data
    const { count = resp.pokemon_entries[resp.pokemon_entries.length - 1].entry_number} = resp
    res.status(200).json({count})
    })
    .catch(err => {
        res.sendStatus(404)
    })
    
})

app.listen(PORT, () => {
    console.log(`The server has been started on port: ${PORT}`)
})