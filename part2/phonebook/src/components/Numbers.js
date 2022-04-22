import Number from './Number'

const Numbers = ({ persons, deletePersonFn }) => {
  return persons.length === 0 ? (
    <div>No Data</div>
  ) : (
    <>
      {persons.map((person) => (
        <Number
          key={person.id}
          person={person}
          deletePerson={() => deletePersonFn(person)}
        />
      ))}
    </>
  )
}

export default Numbers
