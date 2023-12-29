const boomHandler = (err, req, res, next) => {
  if(err && err.isBoom) {
    const { output } = err
    return res
      .status(output.statusCode)
      .send(output.payload)
  }
  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.status(500).json({error: err.message})
}

export {
  boomHandler,
  errorHandler
}