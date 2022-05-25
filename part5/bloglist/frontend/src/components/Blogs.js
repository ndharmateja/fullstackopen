import React, { useState } from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, handleLogout, handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>blogs</h2>
      <div className=''>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <h2>create new</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleCreate({ title, author, url })
          setTitle('')
          setAuthor('')
          setUrl('')
        }}
      >
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

        <button type='submit'>create</button>
      </form>

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
