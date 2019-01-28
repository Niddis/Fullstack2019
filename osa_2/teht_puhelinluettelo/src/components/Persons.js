import React from 'react'

const Persons = ({persons}) => {
  const rows = () => persons.map(person => 
    <p key={person.name}>{person.name} {person.number}</p>
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export default Persons