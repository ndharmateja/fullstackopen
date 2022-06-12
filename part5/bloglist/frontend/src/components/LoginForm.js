import React, { useState } from 'react'
import Notification from './Notification'
import propTypes from 'prop-types'

const LoginForm = ({ handleLogin, notification, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      await handleLogin({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'wrong username or password', isError: true })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
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
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  setNotification: propTypes.func.isRequired,
  notification: propTypes.object,
}

export default LoginForm
