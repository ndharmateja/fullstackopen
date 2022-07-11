import React from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks/useField'
import { addComment } from '../reducers/blogsReducer'

const CommentForm = ({ blogId }) => {
  const { setValue, ...comment } = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.value.trim()) {
      dispatch(addComment({ id: blogId, content: comment.value.trim() }))
      setValue('')
    }
  }

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <textarea maxLength={100} {...comment} placeholder='Add new comment' />
      <br />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm
