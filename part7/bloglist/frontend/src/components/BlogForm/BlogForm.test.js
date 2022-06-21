import React from 'react'
import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

test('blog form', async () => {
  const title = 'New blog title'
  const author = 'New blog author'
  const url = 'New blog url'

  const handleCreate = jest.fn()
  render(<BlogForm handleCreate={handleCreate} />)

  const titleInput = screen.getByPlaceholderText('Blog Title')
  const authorInput = screen.getByPlaceholderText('Blog Author')
  const urlInput = screen.getByPlaceholderText('Blog Url')

  const user = userEvent.setup()
  const createButton = screen.getByText('Create')

  await user.type(titleInput, title)
  await user.type(authorInput, author)
  await user.type(urlInput, url)

  await user.click(createButton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0]).toEqual({ title, url, author })
})
