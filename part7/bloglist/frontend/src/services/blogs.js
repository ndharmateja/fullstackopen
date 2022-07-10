import axios from 'axios'
import { LOGGED_BLOGAPP_USER } from '../reducers/userReducer'
const baseUrl = '/api/blogs'

const getToken = () => {
  const { token } = JSON.parse(window.localStorage.getItem(LOGGED_BLOGAPP_USER))
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async ({ title, author, url }) => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

const updateBlog = async ({ id, title, author, url, likes }) => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { title, author, url, likes },
    config
  )
  return response.data
}

const deleteBlog = async (id) => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, createBlog, updateBlog, deleteBlog }
