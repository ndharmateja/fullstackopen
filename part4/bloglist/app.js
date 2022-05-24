const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./routers/blogs')
const usersRouter = require('./routers/users')
const loginRouter = require('./routers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to Mongo DB')
mongoose
  .connect(config.MONGODB_URI)
  .then((_result) => logger.info('Successfully connected to Mongo DB'))
  .catch((error) =>
    logger.error('Error connecting to Mongo DB:', error.message)
  )

const app = express()
app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownRoute)
app.use(middleware.errorHandler)

module.exports = app
