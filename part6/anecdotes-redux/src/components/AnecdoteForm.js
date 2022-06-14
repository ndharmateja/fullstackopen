import React from 'react'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  removeNotification,
  setNotification,
} from '../redux/reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you create '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
    event.target.anecdote.value = ''
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
