import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    increaseVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { increaseVote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
