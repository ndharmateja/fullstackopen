import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: 'notification',
    show: false,
    timeoutId: undefined,
  },
  reducers: {
    showNotification(state, action) {
      return { notification: action.payload, show: true }
    },
    hideNotification(state) {
      return { ...state, show: false }
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
const { setTimeoutId } = notificationSlice.actions

export const setNotification = (notificationMessage, timeInSeconds) => {
  return (dispatch, getState) => {
    const {
      notification: { show, timeoutId },
    } = getState()

    // If the notification is already being shown
    // clear the old timeout
    if (show) {
      clearTimeout(timeoutId)
    }

    // Dispatch the new notification message
    dispatch(showNotification(notificationMessage))
    const newTimeoutId = setTimeout(
      () => dispatch(hideNotification()),
      timeInSeconds * 1000
    )

    // Dispatch the timeout id to be set
    dispatch(setTimeoutId(newTimeoutId))
  }
}

export default notificationSlice.reducer
