import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_BLOGAPP_USER = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isCreateLoading, setIsCreateLoading] = useState(false)

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
      setError('Invalid credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
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
      {error && <p>Error: {error}</p>}
      {!user && (
        <LoginForm
          {...{ handleLogin, username, setUsername, password, setPassword }}
        />
      )}
      {user && (
        <Blogs
          {...{ blogs, user, handleLogout, handleCreate, isCreateLoading }}
        />
      )}
    </>
  )
}

export default App
