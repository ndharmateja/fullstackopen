const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (request, response) => {
  const users = await User.find({})
  return response.json(users)
}

const createUser = async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response
      .status(400)
      .json({ error: "'password' field should not be empty" })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  return response.status(201).json(savedUser)
}

const getUser = async (request, response) => {}
const updateUser = async (request, response) => {}
const deleteUser = async (request, response) => {}

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
