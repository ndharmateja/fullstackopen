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

export default Filter
