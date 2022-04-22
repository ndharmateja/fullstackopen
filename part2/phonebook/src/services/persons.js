import axios from 'axios'

const baseUrl = 'http://localhost:3003/persons'

const getResponseData = (response) => response.data

const getPersons = () => axios.get(baseUrl).then(getResponseData)

const addPerson = (person) => axios.post(baseUrl, person).then(getResponseData)

export default { getPersons, addPerson }
