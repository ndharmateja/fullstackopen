import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url }) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState()
    await blogService.createBlog({ title, author, url }, token)

    const newBlogs = await blogService.getAll()
    dispatch(setBlogs(newBlogs))

    const message = `a new blog "${title}" by "${author}" added`
    dispatch(showNotification(message, false))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const {
      blogs,
      user: { token },
    } = getState()

    await blogService.deleteBlog(id, token)

    const blogToDelete = blogs.find((blog) => blog.id === id)

    const message = `Blog "${blogToDelete.title}" by "${blogToDelete.author}" deleted`
    dispatch(showNotification(message, false))

    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
  }
}

export const updateBlog = ({ id, title, author, url, likes }) => {
  return async (dispatch, getState) => {
    const {
      blogs,
      user: { token },
    } = getState()
    const updatedBlog = await blogService.updateBlog(
      {
        id,
        title,
        author,
        url,
        likes,
      },
      token
    )

    dispatch(
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return {
              ...blog,
              title: updatedBlog.title,
              url: updatedBlog.url,
              likes: updatedBlog.likes,
              author: updatedBlog.author,
            }
          }
          return blog
        })
      )
    )
  }
}

export default blogsSlice.reducer
