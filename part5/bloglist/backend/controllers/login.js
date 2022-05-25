const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  if (!user) {
    return response.status(400).json({ error: 'invalid username' })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordCorrect) {
    return response.status(400).json({ error: 'invalid password' })
  }

  const userForToken = { username, id: user._id }
  const token = jwt.sign(userForToken, process.env.SECRET)

  return response.json({ username, token, name: user.name })
}

module.exports = { loginUser }
