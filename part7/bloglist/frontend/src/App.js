import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import Blogs from './components/Blogs'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import AppLayout from './components/AppLayout'
import Users from './components/Users'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog/Blog'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container className='container'>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route
          element={
            loggedInUser ? <AppLayout /> : <Navigate replace to='/login' />
          }
        >
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<Blog />} />
        </Route>
        <Route
          element={loggedInUser ? <Navigate replace to='/' /> : <LoginForm />}
          path='/login'
        />
      </Routes>
    </Container>
  )
}

export default App
