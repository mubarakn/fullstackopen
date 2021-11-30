import React, { useState, useEffect } from 'react'
import personService from "./services/persons"

import "./app.css"

const Filter = ({ query, onQueryChange }) => {
  return (
    <div>
      filter shown with <input type="text" value={query} onChange={onQueryChange} />
    </div>
  )
}

const PersonForm = ({ handleFormSubmit, name, number, onNameChanged, onNumberChanged }) => {
  return (
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={name} onChange={onNameChanged} />
        </div>
        <div>
          number: <input value={number} onChange={onNumberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, query, onPersonDeleted }) => {
  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id)
      .then(response => {
        onPersonDeleted(person)
      })
    }
  }
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  return filteredPersons.length ? filteredPersons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>) : <div>no results</div>
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        const { data } = response
        setPersons(data)
      })
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert('All fields are required.')
      return
    }
    const person = { id: persons.length+1, name: newName, number: newNumber }
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if(existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService.update(existingPerson.id, person)
        .then(response => {
          setInfoMessage(`Information of ${person.name} updated`)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data ))
          setTimeout(() => { setInfoMessage(null) }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
      return
    }

    const numberExists = persons.find(p => p.number === newNumber)
    if(numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    personService.create(person)
    .then(response => {
      setInfoMessage(`Added ${person.name}`)
      setPersons([...persons, response.data])
      setTimeout(() => { setInfoMessage(null) }, 5000)
    })
    setNewName('')
    setNewNumber('')
  }

  const handlePersonDeleted = person => {
    setPersons(persons.filter(p => p.id !== person.id))
  }

  return (
    <div>
      {infoMessage ? <div className="message success">{infoMessage}</div> : null}
      {errorMessage ? <div className="message error">{errorMessage}</div> : null}
      <h2>Phonebook</h2>
      <Filter query={query} onQueryChange={e => setQuery(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm handleFormSubmit={handleFormSubmit} name={newName} onNameChanged={e => setNewName(e.target.value)} number={newNumber} onNumberChanged={e => setNewNumber(e.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} onPersonDeleted={handlePersonDeleted}/>
    </div>
  )
}

export default App