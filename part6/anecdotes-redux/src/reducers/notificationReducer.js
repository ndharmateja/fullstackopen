import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: 'notification', show: false },
  reducers: {
    showNotification(state, action) {
      return { notification: action.payload, show: true }
    },
    hideNotification(state) {
      return { ...state, show: false }
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (notification, timeInSeconds) => {
  return (dispatch) => {
    dispatch(showNotification(notification))
    setTimeout(() => dispatch(hideNotification()), timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
