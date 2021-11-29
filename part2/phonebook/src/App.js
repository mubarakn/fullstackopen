import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert('All fields are required.')
      return
    }

    const nameExists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if(nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const numberExists = persons.find(p => p.number === newNumber)
    if(numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    setPersons([...persons, { id: persons.length+1, name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.length ? filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>) : <div>no results</div>}
    </div>
  )
}

export default App