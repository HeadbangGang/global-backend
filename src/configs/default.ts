module.exports = {
    development: {
        pokedex: {
            uri: 'http://localhost:3002/api/v2'
        },
        email: {
            credentials: {
                host: 'localhost',
                port: 1025,
                auth: {
                    user: 'project.1',
                    pass: 'secret.1'
                }
            }
        }
    },
    production: {
        pokedex: {
            uri: 'https://pokeapi.co/api/v2'
        },
        email: {
            credentials: {
                service: 'gmail',
                auth:{
                    user: 'tayden.contact@gmail.com',
                    pass: 'pkmyrhlkchjwellg'
                }
            }
        }
    }
}
