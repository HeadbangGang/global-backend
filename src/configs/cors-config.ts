import { CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
    origin: (_origin, callback) => {
        callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
}