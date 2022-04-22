const Number = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Number
