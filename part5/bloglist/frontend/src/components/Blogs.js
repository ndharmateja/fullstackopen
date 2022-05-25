import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div className=''>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
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
