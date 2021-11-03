import express from 'express'
import { router } from './endpoints'

const PORT = 3002

express()
    .use(router)
    .listen(PORT, () => {
        console.log(`mock api server is started on ${PORT}`)
    })