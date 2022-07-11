const { getComments, createComment } = require('../controllers/comments')

const commentsRouter = require('express').Router({ mergeParams: true })
commentsRouter.route('/').post(createComment)

module.exports = commentsRouter
