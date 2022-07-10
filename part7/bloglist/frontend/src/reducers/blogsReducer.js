import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

const { setBlogs, removeBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    await blogService.createBlog({ title, author, url })

    const newBlogs = await blogService.getAll()
    dispatch(setBlogs(newBlogs))

    const message = `a new blog "${title}" by "${author}" added`
    dispatch(showNotification(message, false))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.deleteBlog(id)

    const { blogs } = getState()
    const blogToDelete = blogs.find((blog) => blog.id === id)

    const message = `Blog "${blogToDelete.title}" by "${blogToDelete.author}" deleted`
    dispatch(showNotification(message, false))

    dispatch(removeBlog(id))
  }
}

export default blogsSlice.reducer
