import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <div className=''>
        <div>{user.name} logged in</div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
    </>
  )
}

export default LoggedUser
