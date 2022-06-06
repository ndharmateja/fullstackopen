const Blog = require('../models/blog')
const User = require('../models/user')

const resetDb = async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
}

module.exports = resetDb
