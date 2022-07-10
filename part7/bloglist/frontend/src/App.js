import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  updateBlog,
} from './reducers/blogsReducer'

const LOGGED_BLOGAPP_USER = 'loggedBlogappUser'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const blogs = [...useSelector((state) => state.blogs)]
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(LOGGED_BLOGAPP_USER, JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(LOGGED_BLOGAPP_USER)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
    setUser(null)
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
