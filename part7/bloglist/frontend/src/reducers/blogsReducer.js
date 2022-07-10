import { createSlice } from '@reduxjs/toolkit'
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
  return async (dispatch) => {
    await blogService.createBlog({ title, author, url })
    const newBlogs = await blogService.getAll()
    dispatch(setBlogs(newBlogs))
  }
}

export default blogsSlice.reducer
