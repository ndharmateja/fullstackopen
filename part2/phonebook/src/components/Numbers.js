import Number from './Number'

const Numbers = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <Number key={person.id} person={person} />
      ))}
    </>
  )
}

export default Numbers
