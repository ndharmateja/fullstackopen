import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const { message, isError } = action.payload
      return { message, isError }
    },
    removeNotification() {
      return null
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (message, isError) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError }))
    setTimeout(() => dispatch(removeNotification()), 3000)
  }
}

export default notificationSlice.reducer
