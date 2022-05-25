const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogs')
const { userExtractor } = require('../utils/middleware')

const blogsRouter = require('express').Router()
blogsRouter.route('/').get(getBlogs).post(userExtractor, createBlog)
blogsRouter.route('/:id').delete(userExtractor, deleteBlog).put(updateBlog)

module.exports = blogsRouter
