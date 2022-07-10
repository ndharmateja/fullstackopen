import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { loadUserFromStorage } from './reducers/userReducer'
import Blogs from './components/Blogs/Blogs'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import AppLayout from './components/AppLayout'

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

export default App
