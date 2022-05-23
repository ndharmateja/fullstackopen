const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, blogsInDb } = require('./helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  // Delete the existing blogs
  await Blog.deleteMany({})

  // Create promises to create blogs
  const createBlogPromises = initialBlogs
    .map((blog) => new Blog(blog))
    .map((blog) => blog.save())

  // Execute all promises
  await Promise.all(createBlogPromises)
})

test('check number of blogs returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogs = response.body

  expect(blogs).toHaveLength(initialBlogs.length)
  expect(blogs.map((blog) => blog.title)).toContainEqual(initialBlogs[0].title)
})

test('check id property of each blog', async () => {
  const blogs = await blogsInDb()

  blogs.forEach((blog) => expect(blog.id).toBeDefined())
})
