import React from 'react'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  removeNotification,
  setNotification,
} from '../redux/reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`you create '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
