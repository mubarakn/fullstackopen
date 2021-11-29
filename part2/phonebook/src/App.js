import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault()

    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if(person) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons, { name: newName}])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div>{person.name}</div>)}
    </div>
  )
}

export default App