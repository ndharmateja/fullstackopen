import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => (token = `bearer ${newToken}`)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async ({ title, author, url }) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

export default { getAll, createBlog, setToken }
