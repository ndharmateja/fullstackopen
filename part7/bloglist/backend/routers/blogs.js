const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogs')
const { userExtractor } = require('../utils/middleware')
const commentsRouter = require('./comments')

const blogsRouter = require('express').Router()
blogsRouter.route('/').get(getBlogs).post(userExtractor, createBlog)
blogsRouter.route('/:id').delete(userExtractor, deleteBlog).put(updateBlog)

blogsRouter.use('/:id/comments', commentsRouter)

module.exports = blogsRouter
