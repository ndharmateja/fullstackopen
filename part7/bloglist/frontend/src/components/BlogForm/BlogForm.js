import React from 'react'
import propTypes from 'prop-types'
import { TextField, Button } from '@mui/material'
import useField from '../../hooks/useField'

const BlogForm = ({ handleCreate }) => {
  const { setValue: setTitle, ...title } = useField('text')
  const { setValue: setAuthor, ...author } = useField('text')
  const { setValue: setUrl, ...url } = useField('text')

  const addBlog = async (e) => {
    e.preventDefault()
    await handleCreate({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField {...title} label='title'></TextField>
        </div>
        <div>
          <TextField {...author} label='author'></TextField>
        </div>
        <div>
          <TextField {...url} label='url'></TextField>
        </div>

        <div>
          <Button variant='contained' color='primary' type='submit'>
            create
          </Button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleCreate: propTypes.func.isRequired,
}

export default BlogForm
