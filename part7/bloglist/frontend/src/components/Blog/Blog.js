import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { updateBlog } from '../../reducers/blogsReducer'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === id)
  })
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
  }

  const handleUpdate = async ({ id, title, author, url, likes }) => {
    dispatch(updateBlog({ id, title, author, url, likes }))
  }

  const likeBlog = async () => {
    const { id, title, url, author, likes } = blog
    await handleUpdate({
      id,
      title,
      url,
      author,
      likes: likes + 1,
    })
  }

  const deleteBlog = async () => {
    const confirm = window.confirm(
      `Remove "${blog.title}" by "${blog.author}"?`
    )
    if (confirm) await handleDelete(blog.id)
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
            <button onClick={deleteBlog}>remove</button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Blog
