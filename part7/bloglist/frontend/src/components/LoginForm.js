import React, { useState } from 'react'
import Notification from './Notification'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = ({ handleLogin }) => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      await handleLogin({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(showNotification('wrong username or password', true))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form action='' onSubmit={loginUser} id='login-form'>
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

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
}

export default LoginForm
