import React from 'react'

const BlogForm = ({
  handleCreate,
  title,
  author,
  url,
  setNotification,
  setTitle,
  setAuthor,
  setUrl,
  isCreateLoading,
}) => {
  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleCreate({ title, author, url })
          setNotification({
            message: `a new blog "${title}" by "${author}" added`,
            isError: false,
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          setTitle('')
          setAuthor('')
          setUrl('')
        }}
      >
        {/* title */}
        <label htmlFor='title'>title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <br />

        {/* author */}
        <label htmlFor='author'>author:</label>
        <input
          type='text'
          id='author'
          name='author'
          value={author}
          onChange={({ target: { value } }) => setAuthor(value)}
        />
        <br />

        {/* url */}
        <label htmlFor='url'>url:</label>
        <input
          type='text'
          id='url'
          name='url'
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
        />
        <br />

        <button type='submit' disabled={isCreateLoading}>
          {isCreateLoading ? 'loading..' : 'create'}
        </button>
      </form>
    </>
  )
}

export default BlogForm
