const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownRoute)

module.exports = app
