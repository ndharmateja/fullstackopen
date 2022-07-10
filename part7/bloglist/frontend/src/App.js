import { useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from './reducers/blogsReducer'
import {
  loginUser,
  logoutUser,
  loadUserFromStorage,
} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const { notification, user } = useSelector((state) => state)
  const blogs = [...useSelector((state) => state.blogs)]

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs(blogService))
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password })).then(() => {
      if (user) blogService.setToken(user.token)
    })
  }

  useEffect(() => {
    dispatch(loadUserFromStorage()).then(() => {
      if (user) blogService.setToken(user.token)
    })
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div className=''>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
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
        </div>
      )}
    </>
  )
}

export default App
