import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getResponseData = (response) => response.data

const getPersons = () => axios.get(baseUrl).then(getResponseData)

const addPerson = (person) => axios.post(baseUrl, person).then(getResponseData)

const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`)

const updatePerson = (personId, person) =>
  axios.put(`${baseUrl}/${personId}`, person).then(getResponseData)

export default { getPersons, addPerson, deletePerson, updatePerson }
