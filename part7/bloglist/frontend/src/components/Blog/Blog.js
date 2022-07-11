import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../../reducers/blogsReducer'
import CommentForm from '../CommentForm'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  List,
  ListItem,
} from '@mui/material'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === id)
  })
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove "${blog.title}" by "${blog.author}"?`
    )
    if (confirm) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  const likeBlog = async () => {
    const { id, title, url, author, likes } = blog
    dispatch(updateBlog({ id, title, author, url, likes: likes + 1 }))
  }

  if (!blog) return null

  return (
    <>
      <br />
      <Container className='blog'>
        <Typography variant='h3'>Blog</Typography>
        <Card>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {blog.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <a href={blog.url}>{blog.url}</a>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Author: </strong>
              {blog.author}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Likes: </strong>
              {blog.likes}
            </Typography>
            <br />
            <Typography variant='body2'>
              <strong>Created by: </strong>
              <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={likeBlog}>
              like
            </Button>
            {blog.user.username === user.username && (
              <Button size='small' onClick={handleDelete}>
                remove
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
      <br />
      <br />
      <Container>
        <Typography variant='h3'>Comments</Typography>
        {blog.comments.length === 0 ? (
          <p>&emsp;No comments</p>
        ) : (
          <List sx={{ listStyleType: 'circle' }}>
            {blog.comments.map((comment) => (
              <ListItem key={comment.id}>{comment.content}</ListItem>
            ))}
          </List>
        )}
        <br />
        <CommentForm blogId={blog.id} />
      </Container>
    </>
  )
}

export default Blog
