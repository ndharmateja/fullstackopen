import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import useField from '../hooks/useField'
import { TextField, Button } from '@mui/material'

const LoginForm = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { setValue: setUsername, ...username } = useField('text')
  const { setValue: setPassword, ...password } = useField('password')

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
        <div>
          <TextField
            label='username'
            {...username}
            name='username'
            id='username'
          ></TextField>
        </div>
        <div>
          <TextField
            label='password'
            {...password}
            name='password'
            id='password'
          ></TextField>
        </div>
        <Button
          variant='contained'
          color='primary'
          id='login-button'
          type='submit'
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
