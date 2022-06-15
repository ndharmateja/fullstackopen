import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdoteObj = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAnecdotes, createAnecdote, updateAnecdote }
