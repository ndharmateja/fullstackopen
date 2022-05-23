const { info } = require('./logger')

const unknownRoute = (_request, response, _next) => {
  response.status(404).end()
}

const errorHandler = (error, request, response, next) => {
  const { name, message } = error
  switch (name) {
    case 'ValidationError':
    case 'CastError':
      return response.status(400).send({ error: message })
  }
  info(error)
  next(error)
}

module.exports = { unknownRoute, errorHandler }
