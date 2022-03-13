import express, { Request, Response, Router } from 'express'
import fs from 'fs'
export const router: Router = express.Router()

const file = (fileName: fs.PathLike, contentType = 'application/json', status = 200) => {
    return (req: Request, res: Response) => {
        res.writeHead(status, {
            'Content-Type': contentType
        })
        fs.createReadStream(fileName).pipe(res)
    }
}

// Pokemon List
router.get('/api/v2/pokemon', file('mocks/pokemon/initial.json'))
// Pokemon Data
router.get('/api/v2/pokemon/charmander', file('mocks/pokemon/individual/charmander.json'))
router.get('/api/v2/pokemon/charmeleon', file('mocks/pokemon/individual/charmeleon.json'))
router.get('/api/v2/pokemon/charizard', file('mocks/pokemon/individual/charizard.json'))
router.get('/api/v2/pokemon/squirtle', file('mocks/pokemon/individual/squirtle.json'))
router.get('/api/v2/pokemon/wartortle', file('mocks/pokemon/individual/wartortle.json'))
router.get('/api/v2/pokemon/blastoise', file('mocks/pokemon/individual/blastoise.json'))
router.get('/api/v2/pokemon/bulbasaur', file('mocks/pokemon/individual/bulbasaur.json'))
router.get('/api/v2/pokemon/ivysaur', file('mocks/pokemon/individual/ivysaur.json'))
router.get('/api/v2/pokemon/venusaur', file('mocks/pokemon/individual/venusaur.json'))
// Pokémon Count
router.get('/api/v2/pokedex/1', file('mocks/pokemon/count.json'))
