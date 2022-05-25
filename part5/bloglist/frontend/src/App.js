import { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (e) {
      console.log('error', JSON.stringify(e, null, 2))
      setError('Invalid credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <>
      {error && <p>Error: {error}</p>}
      {!user && (
        <LoginForm
          {...{ handleLogin, username, setUsername, password, setPassword }}
        />
      )}
      {user && <Blogs blogs={blogs} />}
    </>
  )
}

export default App
