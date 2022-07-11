const Comment = require('../models/comment')

const getComments = async (request, response) => {
  const { id: blogId } = request.params
  const comments = await Comment.find({ blog: blogId })

  response.json(comments)
}

const createComment = async (request, response) => {
  const { id: blogId } = request.params
  const { content } = request.body

  const blog = await Blog.findById(blogId)

  const comment = new Comment({
    content,
    blog: blog._id,
  })
  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()

  response.status(201).json(savedComment)
}

module.exports = { getComments, createComment }
