import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const { getPersons, addPerson, deletePerson, updatePerson } = personsService

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

    const personWithSameName = persons.find((person) => person.name === newName)

    console.log('person with same name:', personWithSameName)
    if (personWithSameName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(personWithSameName.id, {
          ...personWithSameName,
          number: newNumber,
        }).then((returnedPerson) => {
          setPersons(
            persons.map((person) => {
              return person.id === personWithSameName.id
                ? returnedPerson
                : person
            })
          )
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      addPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
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
