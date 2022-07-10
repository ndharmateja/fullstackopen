import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { loadUserFromStorage } from './reducers/userReducer'
import Blogs from './components/Blogs/Blogs'
import LoggedUser from './components/LoggedUser/LoggedUser'
import Header from './components/Header/Header'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs(blogService))
  }, [dispatch])

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [])

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<LoginForm />} />
        <Route element={user ? <AppLayout /> : <Navigate replace to='login' />}>
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<Blogs />} />
        </Route>
      </Routes>
    </>
  )
}

const NotFound = () => <h1>Not Found</h1>

const AppLayout = () => {
  return (
    <>
      <Header />
      <Notification />
      <LoggedUser />
      <Outlet />
    </>
  )
}

export default App
