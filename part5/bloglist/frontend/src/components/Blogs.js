import React, { useState } from 'react'
import Blog from './Blog'
import Notification from './Notification'

const Blogs = ({
  blogs,
  user,
  handleLogout,
  handleCreate,
  isCreateLoading,
  notification,
  setNotification,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
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
          setNotification({
            message: `a new blog "${title}" by "${author}" added`,
            isError: false,
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

        <button type='submit' disabled={isCreateLoading}>
          {isCreateLoading ? 'loading..' : 'create'}
        </button>
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
