import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3003/persons')
      .then((response) => setPersons(response.data))
      .catch(console.log)
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filterString.toLowerCase()) ||
      person.number.toLowerCase().includes(filterString.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterString={filterString} setFilterString={setFilterString} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewName={addNewName}
      />

      <h3>Numbers</h3>
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App
