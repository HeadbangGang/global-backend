import express from 'express'
const fs = require('fs')

export const router = express.Router()

const file = function (fileName) {
    return (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        fs.createReadStream(fileName).pipe(res)
    }
}
// Pokemon List
router.get('/pokemon', file('mocks/pokemon/initial.json'))
// Pokemon Data
router.get('/pokemon/charmander', file('mocks/pokemon/individual/charmander.json'))
router.get('/pokemon/charmeleon', file('mocks/pokemon/individual/charmeleon.json'))
router.get('/pokemon/charizard', file('mocks/pokemon/individual/charizard.json'))
router.get('/pokemon/squirtle', file('mocks/pokemon/individual/squirtle.json'))
router.get('/pokemon/wartortle', file('mocks/pokemon/individual/wartortle.json'))
router.get('/pokemon/blastoise', file('mocks/pokemon/individual/blastoise.json'))
router.get('/pokemon/bulbasaur', file('mocks/pokemon/individual/bulbasaur.json'))
router.get('/pokemon/ivysaur', file('mocks/pokemon/individual/ivysaur.json'))
router.get('/pokemon/venusaur', file('mocks/pokemon/individual/venusaur.json'))
// Pokémon Count
router.get('/pokedex/1', file('mocks/pokemon/count.json'))
