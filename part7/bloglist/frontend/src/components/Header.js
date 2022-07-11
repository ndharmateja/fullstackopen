import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 0,
  }
  return (
    <>
      <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>
                Users
              </Link>
            </Nav.Link>
          </Nav>
          <div style={{ color: 'white' }} className='p-1'>
            <span>{user.name} logged in </span>
            <button onClick={handleLogout}>logout</button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <h2>blog app</h2>
    </>
  )
}

export default Header
