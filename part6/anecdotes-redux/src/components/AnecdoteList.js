import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../redux/reducers/anecdoteReducer'
import {
  removeNotification,
  setNotification,
} from '../redux/reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = [
    ...useSelector((state) => {
      const { anecdotes, filter } = state
      if (filter) {
        return anecdotes.filter((a) => a.content.includes(filter))
      }
      return anecdotes
    }),
  ]
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(increaseVote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  anecdotes.sort((a1, a2) => a2.votes - a1.votes)
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
