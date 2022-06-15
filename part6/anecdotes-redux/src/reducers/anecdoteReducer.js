import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a))
    },
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const increaseVote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdote = anecdotes.find((a) => a.id === id)
    const updatedAnecdote = await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
