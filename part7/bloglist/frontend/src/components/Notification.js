import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const { message, isError } = notification

  return <Alert severity={isError ? 'error' : 'success'}>{message}</Alert>
}

export default Notification
