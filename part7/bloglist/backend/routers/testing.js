const testingRouter = require('express').Router()
const resetDb = require('../controllers/testing')

testingRouter.post('/reset', resetDb)

module.exports = testingRouter
