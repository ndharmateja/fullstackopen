import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

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
