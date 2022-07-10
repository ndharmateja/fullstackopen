import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import LoggedUser from './LoggedUser'
import Notification from './Notification'

const AppLayout = () => {
  return (
    <>
      <Header />
      <Notification />
      <LoggedUser />
      <Outlet />
    </>
  )
}

export default AppLayout
