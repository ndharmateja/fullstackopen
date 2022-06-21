const { loginUser } = require('../controllers/login')
const loginRouter = require('express').Router()

loginRouter.post('/', loginUser)

module.exports = loginRouter
