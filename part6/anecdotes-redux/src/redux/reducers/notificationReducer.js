import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: 'notification', show: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return { notification: action.payload, show: true }
    },
    removeNotification(state) {
      return { ...state, show: false }
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
