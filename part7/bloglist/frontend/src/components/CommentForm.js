import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  return { type, value, onChange, setValue }
}

const CommentForm = ({ blogId }) => {
  const { setValue, ...comment } = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.value) {
      dispatch(addComment({ id: blogId, content: comment.value }))
      setValue('')
    }
  }

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <textarea {...comment} placeholder='Add new comment' />
      <br />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm
