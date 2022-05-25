const {
  createUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
} = require('../controllers/users')

const usersRouter = require('express').Router()
usersRouter.route('/').get(getUsers).post(createUser)
usersRouter.route('/:id').put(updateUser).get(getUser).delete(deleteUser)

module.exports = usersRouter
