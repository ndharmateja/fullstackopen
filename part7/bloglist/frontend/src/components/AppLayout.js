import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Notification from './Notification'

const AppLayout = () => {
  return (
    <>
      <Notification />
      <Header />
      <Outlet />
    </>
  )
}

export default AppLayout
