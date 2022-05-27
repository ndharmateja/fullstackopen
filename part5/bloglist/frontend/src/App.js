import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_BLOGAPP_USER = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isCreateLoading, setIsCreateLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(LOGGED_BLOGAPP_USER, JSON.stringify(user))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      setNotification({ message: 'wrong username or password', isError: true })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(LOGGED_BLOGAPP_USER)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (e) => {
    window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
    setUser(null)
  }

  const handleCreate = async ({ title, author, url }) => {
    setIsCreateLoading(true)
    const savedBlog = await blogService.createBlog({ title, author, url })
    setIsCreateLoading(false)
    setBlogs(blogs.concat(savedBlog))
  }

  return (
    <>
      {!user && (
        <LoginForm
          {...{
            handleLogin,
            username,
            setUsername,
            password,
            setPassword,
            notification,
          }}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div className=''>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Togglable buttonLabel='New Note'>
            <BlogForm
              {...{
                handleCreate,
                title,
                author,
                url,
                setNotification,
                setTitle,
                setAuthor,
                setUrl,
                isCreateLoading,
              }}
            />
          </Togglable>

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
