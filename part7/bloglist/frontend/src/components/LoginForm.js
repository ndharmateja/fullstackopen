import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginUser = async (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
      .then(() => {
        setUsername('')
        setPassword('')
        navigate('/')
      })
      .catch(() => {
        dispatch(showNotification('wrong username or password', true))
      })
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form action='' onSubmit={handleLoginUser} id='login-form'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <br />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <br />
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
