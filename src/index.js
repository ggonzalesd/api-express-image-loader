import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import router from './router.js'
import { boomHandler, errorHandler } from './handler.js'

config()
const PORT = process.env.PORT ?? 3000

const app = express()

app.use(cors())

app.use('/img', router)

app.use(boomHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`)
})
