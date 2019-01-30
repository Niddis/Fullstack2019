import React from 'react'

const Persons = ({persons, deletoi}) => {
  const rows = () => persons.map(person => 
    <div key={person.id}>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletoi(person.id)}>poista</button>
    </div>
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export default Persons