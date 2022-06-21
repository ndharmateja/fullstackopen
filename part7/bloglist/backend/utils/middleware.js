const jwt = require('jsonwebtoken')
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

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7)
    const user = jwt.verify(token, process.env.SECRET)
    request.user = user
  }
  next()
}

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

module.exports = {
  unknownRoute,
  errorHandler,
  tokenExtractor,
  userExtractor,
  requestLogger,
}
