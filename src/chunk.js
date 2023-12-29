const chunkLoader = async (req, res, next) => {
  let imageData = Buffer.alloc(0)

  req.on('data', (chunk) => 
    imageData = Buffer.concat([imageData, chunk])
  )

  req.on('end', () => {
    req.body = imageData
    next()
  })
}

export default chunkLoader