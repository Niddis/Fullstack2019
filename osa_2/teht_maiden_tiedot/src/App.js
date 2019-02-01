import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({country}) => {
  const listLanguages = () => country.languages.map(l => 
    <li key={l.name}>{l.name}</li>)

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital} <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {listLanguages()}
      </ul>
      <img src={country.flag} alt="country's flag" height="100" width="150" />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [findCountries, setFindCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setFindCountries(response.data)
      })
  }, [])

  const handleSearch =(event) => {
    setNewSearch(event.target.value)
    setFindCountries(countries.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const selectCountry = name => {
    setFindCountries(countries.filter(c => c.name === name))
  }

  const printCountries = () => {
    if (findCountries.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    } else if (findCountries.length > 1) {
      return findCountries.map(c => 
        <div key={c.name}>
          {c.name}
          <button onClick={() => selectCountry(c.name)}>show</button>
        </div>)
    } else if (findCountries.length === 1) {
      return (<Country country={findCountries[0]}/>)
    }
  }

  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearch}/>
      {printCountries()}
    </div>
  )
}

export default App;