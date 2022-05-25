import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
