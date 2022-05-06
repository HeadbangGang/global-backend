import express from 'express'
import { router } from './endpoints'

const PORT = 3002

const app = express()
app.use('/api/v2/', router)
app.listen(PORT,
    () => {
        console.log(`mock api server is started on ${PORT}`)
    })
