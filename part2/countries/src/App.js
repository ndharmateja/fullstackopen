import { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
  const getCountryName = (country) => country.name.common

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <h2>{getCountryName(country)}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div>
          <img src={`${country.flags.png}`} alt='' width='150' />
        </div>
      </>
    )
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => {
          const countryName = getCountryName(country)
          return <div key={countryName}>{countryName}</div>
        })}
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch(console.log)
  }, [])

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterString.toLowerCase())
  )

  return (
    <>
      <div>
        find countries{' '}
        <input
          type='text'
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
        />
      </div>
      <Countries countries={countriesToShow} />
    </>
  )
}

export default App
