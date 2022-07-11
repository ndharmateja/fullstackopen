import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <div style={{ color: 'white', marginLeft: 'auto' }}>
            <span>{user.name} logged in </span>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <h2>blog app</h2>
    </>
  )
}

export default Header
