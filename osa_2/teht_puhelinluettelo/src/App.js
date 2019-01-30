import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import { setTimeout } from 'timers';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [filterPersons, setFilterPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilterPersons(initialPersons)
      })
  }, [])
  
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
      const existingPerson = persons.find(e => e.name === newName)
      const changedPerson = {...existingPerson, number: newNumber}
      const idc = changedPerson.id
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .update(idc, changedPerson)
          .then(returnedPerson => {
            const change = persons.map(per => per.id !== idc ? per : returnedPerson)
            setPersons(change)
            setFilterPersons(change)
            setMessage(`Henkilön ${returnedPerson.name} numero muutettu`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setMessage(`Virhe: henkilö ${changedPerson.name} on jo poistettu`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            const missing = persons.filter(m => m.id !== idc)
            setPersons(missing)
            setFilterPersons(missing)
          })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObj)
        .then(returnedPerson => {
          const newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          setFilterPersons(newPersons)
          setMessage(`${returnedPerson.name} lisätty`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const p = persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${p.name}`)) {
      personService.deletep(id)
      const newPersons = persons.filter(per => per.id !== id)
      setPersons(newPersons)
      setFilterPersons(newPersons)
      setMessage(`${p.name} poistettiin`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={message} />
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
      <Persons persons={filterPersons} deletoi={deletePerson}/>
    </div>
  )
}

export default App;