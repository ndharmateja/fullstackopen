import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Header = () => {
  const style = { margin: '0.25rem' }
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <>
      <nav
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          backgroundColor: '#ccc',
        }}
      >
        <li style={style}>
          <Link to='/'>blogs</Link>
        </li>
        <li style={style}>
          <Link to='/users'>users</Link>
        </li>
        <div style={style} className=''>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
        </div>
      </nav>
      <h2>blog app</h2>
    </>
  )
}

export default Header
