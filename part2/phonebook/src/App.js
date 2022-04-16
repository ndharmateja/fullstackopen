import { useState } from 'react'

const Filter = ({ filterString, setFilterString }) => {
  return (
    <div>
      filter shown with{' '}
      <input
        type='text'
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      />
    </div>
  )
}

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addNewName,
}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name:{' '}
        <input onChange={(e) => setNewName(e.target.value)} value={newName} />
      </div>
      <div>
        number:{' '}
        <input
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Number = ({ person }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}
    </div>
  )
}

const Numbers = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <Number key={person.id} person={person} />
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const addNewName = (e) => {
    e.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
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
