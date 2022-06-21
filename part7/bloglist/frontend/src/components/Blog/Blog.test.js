import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('blog renders title and author but not likes or url', () => {
  const blog = {
    title: 'Some blog title',
    author: 'some author',
    url: 'some url',
    likes: 23,
  }

  const handleUpdate = jest.fn()
  const handleDelete = jest.fn()
  const { container } = render(
    <Blog
      blog={blog}
      isCreatedByCurrentUser={true}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  )

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(blog.title)
  expect(blogDiv).toHaveTextContent(blog.author)
  expect(blogDiv).not.toHaveTextContent(blog.url)
  expect(blogDiv).not.toHaveTextContent(blog.likes)
})

test('url and likes shown after clicking view', async () => {
  const blog = {
    title: 'Some blog title',
    author: 'some author',
    url: 'some url',
    likes: 23,
    user: { name: 'Creator' },
  }

  const handleUpdate = jest.fn()
  const handleDelete = jest.fn()
  const { container } = render(
    <Blog
      blog={blog}
      isCreatedByCurrentUser={true}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(blog.title)
  expect(blogDiv).toHaveTextContent(blog.author)
  expect(blogDiv).toHaveTextContent(blog.url)
  expect(blogDiv).toHaveTextContent(blog.likes)
})

test('like button clicked twice', async () => {
  const blog = {
    title: 'Some blog title',
    author: 'some author',
    url: 'some url',
    likes: 23,
    user: { name: 'Creator' },
  }

  const handleUpdate = jest.fn()
  const handleDelete = jest.fn()
  render(
    <Blog
      blog={blog}
      isCreatedByCurrentUser={true}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleUpdate.mock.calls).toHaveLength(2)
})
