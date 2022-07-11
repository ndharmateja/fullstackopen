import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../../reducers/blogsReducer'

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
    <div className='blog'>
      <h2>{blog.title}</h2>
      <div>
        <span>
          <strong>URL: </strong>
          <a href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
        </span>
        <br />
        <span>
          <strong>Author: </strong>
          <span>{blog.author}</span>
        </span>
        <br />
        <span>
          <strong>Likes: </strong>
          <span>{blog.likes}</span>
          <button onClick={likeBlog}>like</button>
        </span>
        <br />
        <span>
          <strong>Created by: </strong>
          <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </span>
        {blog.user.username === user.username && (
          <p>
            <button onClick={handleDelete}>remove</button>
          </p>
        )}
        <h3>comments</h3>
        {blog.comments.length === 0 ? (
          <p>&emsp;No comments</p>
        ) : (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Blog
