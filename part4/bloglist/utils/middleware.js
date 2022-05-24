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
    case 'JsonWebTokenError':
      return response.status(401).send({ error: 'Invalid token' })
  }
  info(error)
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = { unknownRoute, errorHandler, tokenExtractor }
