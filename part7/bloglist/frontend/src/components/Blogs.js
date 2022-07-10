import { useRef } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogsReducer'
import BlogForm from './BlogForm/BlogForm'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = [...useSelector((state) => state.blogs)]

  const blogFormRef = useRef()

  const handleCreate = async ({ title, author, url }) => {
    dispatch(createBlog({ title, author, url }))

    // Hide the create form
    blogFormRef.current.toggleVisibility()
  }

  const blogItemStyle = {
    border: '1px solid black',
    margin: '0.5rem',
    padding: '0.5em',
  }

  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  return (
    <>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <div id='blogs'>
        {blogs.map((blog) => (
          <div style={blogItemStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Blogs
