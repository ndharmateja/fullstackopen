import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import Blogs from './components/Blogs'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import AppLayout from './components/AppLayout'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs(blogService))
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route
          path='/login'
          element={user ? <Navigate replace to='/' /> : <LoginForm />}
        />
        <Route
          element={user ? <AppLayout /> : <Navigate replace to='/login' />}
        >
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
