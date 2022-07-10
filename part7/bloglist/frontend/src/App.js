import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import {
  loginUser,
  logoutUser,
  loadUserFromStorage,
} from './reducers/userReducer'
import Blogs from './components/Blogs/Blogs'

const App = () => {
  const dispatch = useDispatch()

  const { notification, user } = useSelector((state) => state)

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
          <Blogs />
        </div>
      )}
    </>
  )
}

export default App
