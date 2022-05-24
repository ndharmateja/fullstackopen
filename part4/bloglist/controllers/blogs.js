const Blog = require('../models/blog')
const User = require('../models/user')

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
}

const createBlog = async (request, response) => {
  const { title, author, url, likes } = request.body

  const someUser = await User.findOne({})
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: someUser._id,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
}

const deleteBlog = async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndRemove(id)
  return response.status(204).end()
}

const updateBlog = async (request, response) => {
  const { id } = request.params
  const body = request.body
  const blog = {
    likes: body.likes,
    url: body.url,
    title: body.title,
    author: body.author,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
  })
  return response.json(updatedBlog)
}

module.exports = { getBlogs, createBlog, deleteBlog, updateBlog }
