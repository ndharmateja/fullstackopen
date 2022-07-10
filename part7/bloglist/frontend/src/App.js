import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { loginUser, loadUserFromStorage } from './reducers/userReducer'
import Blogs from './components/Blogs/Blogs'
import LoggedUser from './components/LoggedUser/LoggedUser'
import Header from './components/Header/Header'

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

  return (
    <>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <Header />
          <Notification notification={notification} />
          <LoggedUser />
          <Blogs />
        </div>
      )}
    </>
  )
}

export default App
