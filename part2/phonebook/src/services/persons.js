import axios from 'axios'

const baseUrl = 'http://localhost:3003/persons'

const getResponseData = (response) => response.data

const getPersons = () => axios.get(baseUrl).then(getResponseData)

const addPerson = (person) => axios.post(baseUrl, person).then(getResponseData)

const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`)

export default { getPersons, addPerson, deletePerson }
