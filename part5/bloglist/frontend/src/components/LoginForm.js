import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  notification,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form action='' onSubmit={handleLogin}>
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

export default LoginForm
