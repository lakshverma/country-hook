import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook that takes country's name as input and returns a country object (using restcountries api) with all the country info
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  const getCountry = async () => {
    const response = await axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
    if (response.data.status === 404) {
      setCountry({found:false})
    }
    else {
      setCountry({...response.data[0], found: true})
    }
  }

  useEffect(() => {
    if (name) {
      getCountry();
    }
  }, [name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
