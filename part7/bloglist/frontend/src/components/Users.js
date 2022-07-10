import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {
  const users = useSelector((state) => state.users)

  const component =
    users.length === 0 ? (
      <div>No Users</div>
    ) : (
      <table style={{ textAlign: 'left' }}>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </table>
    )

  return (
    <>
      <h2>Users</h2>
      {component}
    </>
  )
}

export default Users
