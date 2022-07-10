import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  const component =
    users.length === 0 ? (
      <div>No Users</div>
    ) : (
      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
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
