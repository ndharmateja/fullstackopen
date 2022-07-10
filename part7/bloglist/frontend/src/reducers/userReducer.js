import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

export const LOGGED_BLOGAPP_USER = 'loggedBlogappUser'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

const { setUser } = userSlice.actions

export const loadUserFromStorage = () => {
  return async (dispatch) => {
    const loggedInUser = window.localStorage.getItem(LOGGED_BLOGAPP_USER)
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(LOGGED_BLOGAPP_USER, JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
