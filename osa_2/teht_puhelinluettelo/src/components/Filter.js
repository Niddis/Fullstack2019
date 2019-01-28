import React from 'react'

const Filter = ({newSearch, handleSearchChange}) => {
  return (
    <div>
      rajaa näytettäviä: <input value={newSearch} onChange={handleSearchChange}/>
    </div>
  )
}

export default Filter