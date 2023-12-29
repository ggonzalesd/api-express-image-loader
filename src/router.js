import express from 'express'
import Service from './service.js'
import chunkLoader from './chunk.js'

const service = new Service()
const router = express.Router()

router.get('/load/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    const response = await service.get_image(name)
    res.contentType('jpg').send(response)
  } catch(e) {
    next(e)
  }
})

router.post('/save/:name',
  chunkLoader,
  async (req, res, next) => {
  try {
    const { name } = req.params
    const response = await service.save_image(name, req.body)
    res.contentType('jpg').send(response)
  } catch(e) {
    next(e)
  }
})

export default router