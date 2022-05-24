const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
}

const createBlog = async (request, response) => {
  const { title, author, url, likes } = request.body
  const { token } = request

  const { id: callerId } = jwt.verify(token, process.env.SECRET)
  if (!callerId) {
    return response.status(401).send({ error: 'Invalid token' })
  }

  const callerUser = await User.findById(callerId)
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: callerUser._id,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
}

const deleteBlog = async (request, response) => {
  const { id: blogId } = request.params
  const { token } = request

  const { id: callerId } = jwt.verify(token, process.env.SECRET)
  if (!callerId) {
    return response.status(401).send({ error: 'Invalid token' })
  }

  const blog = await Blog.findById(blogId)
  if (blog.user.toString() !== callerId) {
    return response
      .status(401)
      .json({ error: 'You are unauthorized to delete this blog' })
  }

  await Blog.findByIdAndRemove(blogId)
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
