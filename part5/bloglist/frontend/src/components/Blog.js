import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleDelete, username }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowFull = () => setShowFull((oldShowFull) => !oldShowFull)

  const likeBlog = async () => {
    const { id, title, url, author, likes } = blog
    await handleUpdate({
      id,
      title,
      url,
      author,
      likes: likes + 1,
    })
  }

  const deleteBlog = async () => {
    const confirm = window.confirm(
      `Remove "${blog.title}" by "${blog.author}"?`
    )
    if (confirm) await handleDelete(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        <span style={{ fontSize: '1.4em' }}>
          "{blog.title}" - {blog.author}{' '}
        </span>
        <button style={{ float: 'right' }} onClick={toggleShowFull}>
          {showFull ? 'hide' : 'view'}
        </button>
        <br />
        <br />
        {showFull && (
          <div>
            <span>
              <strong>URL: </strong>
              <a href={blog.url} target='_blank' rel='noreferrer'>
                {blog.url}
              </a>
            </span>
            <br />
            <span>
              <strong>Likes: </strong>
              {blog.likes} <button onClick={likeBlog}>like</button>
            </span>
            <br />
            <span>
              <strong>Created by: </strong>
              {blog.user.name}
            </span>
            {blog.user.username === username && (
              <p>
                <button onClick={deleteBlog}>remove</button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
