import Number from './Number'

const Numbers = ({ persons }) => {
  return persons.length === 0 ? (
    <div>No Data</div>
  ) : (
    <>
      {persons.map((person) => (
        <Number key={person.id} person={person} />
      ))}
    </>
  )
}

export default Numbers
