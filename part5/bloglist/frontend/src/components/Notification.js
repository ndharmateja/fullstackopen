import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null

  const { message, isError } = notification

  const color = isError ? 'red' : 'green'
  const styles = {
    padding: '20px',
    backgroundColor: 'lightGrey',
    color: color,
    border: `5px solid ${color}`,
    borderRadius: '10px',
    margin: '20px 20px 20px 0px',
    fontSize: '25px',
  }
  return <div style={styles}>{message}</div>
}

export default Notification
