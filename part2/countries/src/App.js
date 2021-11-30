import axios from "axios"
import { useEffect, useState } from "react"
import Countries from "./Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if(countries.length) {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(query)))
    }
  }, [countries, query])

  const handleQueryChange = e => {
    const { value } = e.target
    setQuery(value.toLowerCase())
    
  }

  return (
    <div>
      <div>find countries <input type="text" value={query} onChange={handleQueryChange} /></div>
      {!query ? '' : <Countries countries={filteredCountries} />}
    </div>
  )
}

export default App