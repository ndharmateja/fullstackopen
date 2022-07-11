import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)

  const component =
    users.length === 0 ? (
      <div>No Users</div>
    ) : (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )

  return (
    <>
      <h2>Users</h2>
      {component}
    </>
  )
}

export default Users
