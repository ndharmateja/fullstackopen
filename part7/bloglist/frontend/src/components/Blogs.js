import { useEffect, useRef } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog/Blog'
import Togglable from './Togglable'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from '../reducers/blogsReducer'
import BlogForm from './BlogForm/BlogForm'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = [...useSelector((state) => state.blogs)]
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleCreate = async ({ title, author, url }) => {
    dispatch(createBlog({ title, author, url }))

    // Hide the create form
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
  }

  const handleUpdate = async ({ id, title, author, url, likes }) => {
    dispatch(updateBlog({ id, title, author, url, likes }))
  }

  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  return (
    <>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      <div id='blogs'>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isCreatedByCurrentUser={blog.user.username === user.username}
          />
        ))}
      </div>
    </>
  )
}

export default Blogs
