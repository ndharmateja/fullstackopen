import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Typography, Container } from '@mui/material'

const User = () => {
  const { id } = useParams()

  console.log(id)

  const user = useSelector((state) => {
    return state.users.find((user) => user.id === id)
  })
  console.log(JSON.stringify(user, null, 2))

  if (!user) return null

  return (
    <div>
      <br />
      <Typography variant='h3' component='div'>
        {user.name}
      </Typography>
      <br />
      <Container>
        <Typography variant='h4' component='div'>
          Added Blogs
        </Typography>
        <ul>
          {user.blogs.length === 0 ? (
            <p>&emsp;No Blogs</p>
          ) : (
            user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </div>
  )
}

export default User
