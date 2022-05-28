import React, { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    await handleCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        {/* title */}
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <br />

        {/* author */}
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          name='author'
          value={author}
          onChange={({ target: { value } }) => setAuthor(value)}
        />
        <br />

        {/* url */}
        <label htmlFor='url'>url:</label>
        <input
          type='text'
          id='url'
          name='url'
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
        />
        <br />

        <button type='submit'>Create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
}

export default BlogForm
