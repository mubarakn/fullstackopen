import React, { useState, useEffect } from "react"
import axios from "axios";

const fahrenheitToCelcius = (fahrenheit) => (5/9) * (fahrenheit - 32)
  
const degToCompass = (num) => {
var val = Math.floor((num / 22.5) + 0.5);
var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
return arr[(val % 16)];
}

const WeatherData = ({ city }) => {
    const [data, setData] = useState({})
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
    }, [city])

    if (!Object.keys(data).length) {
        return null
    }

    return (
        <div>
        <h2>Weather in {city}</h2>
        <p>temperature: {fahrenheitToCelcius(data.main.temp)} Celcius</p>
        <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
        <p>wind: {data.wind.speed} mph direction: {degToCompass(data.wind.deg)}</p>
        </div>
    )
}

const SingleCountry = ({ country }) => {

    return (
      <div>
        <h2>{country.name.common}</h2>
  
        <p>capital: {country.capital[0]}</p>
        <p>population: {country.population}</p>
        <img src={country.flags.png} alt={country.name.common} />
        <WeatherData city={country.capital[0]} />
      </div>
    )
  }

const CountryItem = ({ country }) => {
    const [showDetail, toggleDetail] = useState(false)
    return !showDetail ? <div>{country.name.common} <button onClick={() => toggleDetail(true)}>show</button></div> : <SingleCountry country={country} />
}

const Countries = ({ countries }) => {

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1 && countries.length < 10) {
        return countries.map(country => <CountryItem key={country.name.common} country={country} />)
    }

    if (countries.length) {
        return <SingleCountry country={countries[0]} />
    }

    return <p>No Match Found</p>
}

export default Countries