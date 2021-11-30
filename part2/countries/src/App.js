import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({ country }) => {
  const [expanded, toggleExpanded] = useState(false)

  if(!expanded) {
    return <div>{country.name.common} <button onClick={() => toggleExpanded(true)}>show</button></div>
  }


}

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>find countries <input type="text" value={query} onChange={e => setQuery(e.target.value)} /></div>
    </div>
  )
}

export default App