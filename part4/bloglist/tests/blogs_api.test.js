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

test('check create new blog', async () => {
  // Create new blog
  const newBlog = {
    title: 'New test blog',
    author: 'Tony Stark',
    url: 'https://google.com',
    likes: 33,
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const savedBlog = response.body

  // Test the returned response of the post request
  expect(savedBlog.id).toBeDefined()
  expect(savedBlog.title).toBe(newBlog.title)

  // Check the state of the DB after the new blog is created
  const blogs = await blogsInDb()
  expect(blogs.length).toBe(initialBlogs.length + 1)
  expect(blogs.map((blog) => blog.title)).toContain(newBlog.title)
})

test('check whether default value of likes is 0', async () => {
  // Create new blog without 'likes'
  const newBlog = {
    title: 'New test blog',
    author: 'Tony Stark',
    url: 'https://google.com',
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const savedBlog = response.body
  const savedBlogId = savedBlog.id

  // Test the returned response of the post request
  expect(savedBlog.likes).toBe(0)

  // Check the blog with the above id has 0 likes
  const blogs = await blogsInDb()
  expect(blogs.find((blog) => blog.id).likes).toBe(0)
})
