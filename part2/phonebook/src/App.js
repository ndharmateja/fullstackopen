import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const { getPersons, addPerson, deletePerson, updatePerson } = personsService

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    isError: null,
  })

  useEffect(() => {
    getPersons().then(setPersons)
  }, [])

  const handleError = (error) => {
    const errorMessage = error.response.data.error
    console.log(typeof errorMessage)
    showNotification(errorMessage, true)
  }

  const showNotification = (message, isError) => {
    setNotification({
      message: message,
      isError: isError,
    })
    setTimeout(() => setNotification({ message: null, isError: null }), 5000)
  }

  const addNewName = (event) => {
    event.preventDefault()

    const personWithSameName = persons.find((person) => person.name === newName)

    if (personWithSameName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(personWithSameName.id, {
          ...personWithSameName,
          number: newNumber,
        })
          .then((returnedPerson) => {
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
          .catch((error) => {
            showNotification(
              `Information of '${newName}' has already been removed from the server`,
              true
            )
            setPersons(
              persons.filter((person) => person.id !== personWithSameName.id)
            )
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      addPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added '${newName}'`, false)
          setNewName('')
          setNewNumber('')
        })
        .catch(handleError)
    }
  }

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filterString.toLowerCase()) ||
      person.number.toLowerCase().includes(filterString.toLowerCase())
  )

  const deletePersonFn = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(personToDelete.id)
        .then(() => {
          console.log('Deleted', personToDelete)
        })
        .catch((error) => {
          showNotification(
            `Information of '${personToDelete.name}' has already been removed from the server`,
            true
          )
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filterString={filterString} setFilterString={setFilterString} />

      <h3>Add a new</h3>
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
