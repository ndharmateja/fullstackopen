const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogs')

const blogsRouter = require('express').Router()
blogsRouter.route('/').get(getBlogs).post(createBlog)
blogsRouter.route('/:id').delete(deleteBlog).put(updateBlog)

module.exports = blogsRouter
