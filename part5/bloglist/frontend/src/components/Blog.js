import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowFull = () => setShowFull((oldShowFull) => !oldShowFull)

  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button onClick={toggleShowFull}>{showFull ? 'hide' : 'view'}</button>
        {showFull && (
          <div>
            <span>{blog.url}</span>
            <br />
            <span>
              likes: {blog.likes} <button>like</button>
            </span>
            <br />
            <span>{blog.user.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
