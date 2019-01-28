import React, { useState } from 'react';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'},
    {name: 'Martti Tienari', number: '050-6543210'},
    {name: 'Arto Järvinen', number: '040-2233444'},
    {name: 'Lea Kutvonen', number: '040-6677889'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    const personFilter = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterPersons(personFilter)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h3>Lisää uusi</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <Persons persons={filterPersons}/>
    </div>
  )
}

export default App;