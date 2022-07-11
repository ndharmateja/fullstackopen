import React, { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  return { type, value, onChange, setValue }
}

const CommentForm = () => {
  const { setValue, ...comment } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    setValue('')
  }

  return (
    <form action='submit' onSubmit={handleSubmit}>
      <input {...comment} placeholder='Add new comment' />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm
