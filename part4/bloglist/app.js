const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blogs')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
