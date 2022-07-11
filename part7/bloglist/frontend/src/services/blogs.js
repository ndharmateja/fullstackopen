import axios from 'axios'
const baseUrl = '/api/blogs'

const buildConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async ({ title, author, url }, token) => {
  const response = await axios.post(
    baseUrl,
    { title, author, url },
    buildConfig(token)
  )
  return response.data
}

const updateBlog = async ({ id, title, author, url, likes }, token) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { title, author, url, likes },
    buildConfig(token)
  )
  return response.data
}

const deleteBlog = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, buildConfig(token))
}

const addComment = async ({ id, content }) => {
  await axios.post(`${baseUrl}/${id}/comments`, { content })
}

export default { getAll, createBlog, updateBlog, deleteBlog, addComment }
