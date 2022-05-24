const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./helper')

const api = supertest(app)
const CONTENT_TYPE = 'Content-Type'
const APPLICATION_JSON = /application\/json/

beforeEach(async () => {
  // Delete the existing users
  await User.deleteMany({})

  // Create promises to create users
  const createUserPromises = initialUsers
    .map((user) => new User(user))
    .map((user) => user.save())

  // Execute all promises
  await Promise.all(createUserPromises)
})

test('test create user', async () => {
  const newUser = {
    username: 'dharma',
    password: 'Test@123',
    name: 'Dharma Teja',
  }
  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect(CONTENT_TYPE, APPLICATION_JSON)

  const savedUser = response.body
  expect(savedUser.password).toBeUndefined()
  expect(savedUser.name).toBe(newUser.name)
  expect(savedUser.username).toBe(newUser.username)

  const dbUsers = await usersInDb()
  expect(dbUsers.length).toBe(initialUsers.length + 1)
  expect(dbUsers.map((user) => user.username)).toContain(newUser.username)
})

test('get all users', async () => {})
