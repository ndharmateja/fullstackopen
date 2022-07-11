import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'

const LoginForm = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { setValue: setUsername, ...username } = useField('text')
  const { setValue: setPassword, ...password } = useField('text')

  const handleLoginUser = async (e) => {
    e.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
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
      <Notification notification={notification} />
      <h2>Log in to application</h2>
      <form action='' onSubmit={handleLoginUser} id='login-form'>
        <label htmlFor='username'>Username</label>
        <input {...username} name='username' id='username' />
        <br />
        <label htmlFor='password'>Password</label>
        <input {...password} name='password' id='password' />
        <br />
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
