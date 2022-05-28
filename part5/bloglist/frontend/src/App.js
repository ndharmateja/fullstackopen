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
  const [notification, setNotification] = useState(null)

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
    await blogService.createBlog({ title, author, url })
    const newBlogs = await blogService.getAll()

    setNotification({
      message: `a new blog "${title}" by "${author}" added`,
      isError: false,
    })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    setBlogs(newBlogs)
  }

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id)

    const blogToDelete = blogs.find((blog) => blog.id === id)
    setNotification({
      message: `Blog "${blogToDelete.title}" by "${blogToDelete.author}" deleted`,
      isError: false,
    })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    setBlogs((oldBlogs) => oldBlogs.filter((blog) => blog.id !== id))
  }

  const handleUpdate = async ({ id, title, author, url, likes }) => {
    const updatedBlog = await blogService.updateBlog({
      id,
      title,
      author,
      url,
      likes,
    })
    setBlogs((oldBlogs) => {
      return oldBlogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return {
            ...blog,
            title: updatedBlog.title,
            url: updatedBlog.url,
            likes: updatedBlog.likes,
            author: updatedBlog.author,
          }
        }
        return blog
      })
    })
  }

  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
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
          <Togglable buttonLabel='Create New Blog'>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>

          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                username={user.username}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
