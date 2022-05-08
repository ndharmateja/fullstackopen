const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
