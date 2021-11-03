import express from 'express'
import fs from 'fs'

export const pokemonRouter = express.Router()

const file = (fileName: fs.PathLike, contentType = 'application/json', status = 200) => {
    return (req, res) => {
        res.writeHead(status, {
            'Content-Type': contentType
        })
        fs.createReadStream(fileName).pipe(res)
    }
}

// Pokemon list data call
pokemonRouter.get('/pokemon', file('mocks/pokemon/initial.json'))
// Pokemon Data
pokemonRouter.get('/pokemon/charmander', file('mocks/pokemon/individual/charmander.json'))
pokemonRouter.get('/pokemon/charmeleon', file('mocks/pokemon/individual/charmeleon.json'))
pokemonRouter.get('/pokemon/charizard', file('mocks/pokemon/individual/charizard.json'))
pokemonRouter.get('/pokemon/squirtle', file('mocks/pokemon/individual/squirtle.json'))
pokemonRouter.get('/pokemon/wartortle', file('mocks/pokemon/individual/wartortle.json'))
pokemonRouter.get('/pokemon/blastoise', file('mocks/pokemon/individual/blastoise.json'))
pokemonRouter.get('/pokemon/bulbasaur', file('mocks/pokemon/individual/bulbasaur.json'))
pokemonRouter.get('/pokemon/ivysaur', file('mocks/pokemon/individual/ivysaur.json'))
pokemonRouter.get('/pokemon/venusaur', file('mocks/pokemon/individual/venusaur.json'))

pokemonRouter.get('/pokedex/1', file('mocks/pokemon/count.json'))