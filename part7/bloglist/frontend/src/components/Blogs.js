import { useRef } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createBlog, updateBlog } from '../reducers/blogsReducer'
import BlogForm from './BlogForm/BlogForm'
import { Link } from 'react-router-dom'
import { FaHeart, FaComment } from 'react-icons/fa'

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
    display: 'flex',
    justifyContent: 'space-between',
  }

  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  const buttonStyle = {
    outline: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
  }

  return (
    <>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <div id='blogs'>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogItemStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <span>
              {blog.likes}{' '}
              <button
                style={buttonStyle}
                onClick={() =>
                  dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
                }
              >
                <FaHeart />
              </button>{' '}
              {blog.comments.length}{' '}
              <Link to={`/blogs/${blog.id}`}>
                <button style={buttonStyle}>
                  <FaComment />
                </button>
              </Link>
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Blogs
