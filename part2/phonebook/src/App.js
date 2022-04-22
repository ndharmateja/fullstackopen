import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const { getPersons, addPerson, deletePerson } = personsService

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    getPersons().then(setPersons)
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    addPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filterString.toLowerCase()) ||
      person.number.toLowerCase().includes(filterString.toLowerCase())
  )

  const deletePersonFn = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(personToDelete.id).then(() =>
        console.log('Deleted', personToDelete)
      )
    }
  }

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
      <Numbers persons={personsToShow} deletePersonFn={deletePersonFn} />
    </div>
  )
}

export default App
