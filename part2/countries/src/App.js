import { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const Weather = ({ latlng }) => {
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    const [lat, lng] = latlng
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      )
      .then((response) => setWeather(response.data))
      .catch(console.log)
  })

  if (typeof weather === 'undefined') return <div></div>

  const temperature = weather.main.temp
  const iconId = weather.weather[0].icon
  const windSpeed = weather.wind.speed

  return (
    <>
      <div>temperature {temperature} Celsius</div>
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
        alt=''
        width='100'
      />
      <div>wind {windSpeed} m/s</div>
    </>
  )
}

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
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
      <h2>Weather in {country.capital[0]}</h2>
      <Weather latlng={country.capitalInfo.latlng} />
    </>
  )
}

const Countries = ({
  countries,
  countryNameSelected,
  setCountryNameSelected,
}) => {
  const handleButtonClick = (countryName) => {
    setCountryNameSelected(countryName)
  }

  if (countries.length === 0) {
    return <div>No countries</div>
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return <Country country={country} />
  } else if (countries.length > 1) {
    if (countryNameSelected.length !== 0) {
      const country = countries.find(
        (country) => country.name.common === countryNameSelected
      )
      return <Country country={country} />
    } else
      return (
        <>
          {countries.map((country) => {
            const countryName = country.name.common
            return (
              <div key={countryName}>
                {countryName}{' '}
                <button onClick={() => handleButtonClick(countryName)}>
                  show
                </button>
              </div>
            )
          })}
        </>
      )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [countryNameSelected, setCountryNameSelected] = useState('')

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
          onChange={(e) => {
            setFilterString(e.target.value)
            setCountryNameSelected('')
          }}
        />
      </div>
      <Countries
        countries={countriesToShow}
        countryNameSelected={countryNameSelected}
        setCountryNameSelected={setCountryNameSelected}
      />
    </>
  )
}

export default App
