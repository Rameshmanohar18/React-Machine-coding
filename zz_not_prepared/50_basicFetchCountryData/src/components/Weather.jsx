import React, { useState, useEffect } from 'react';
import data from '../../public/data.json';

const VALID_CITIES = ['bogota', 'tokyo', 'madrid', 'paris', 'washington'];

function validateCity(city) {
  if (typeof city !== 'string') {
    throw new Error('not a string');
  }
  if (city.trim() === '') {
    throw new Error('string is empty');
  }
  if (!VALID_CITIES.includes(city.trim().toLowerCase())) {
    throw new Error('city not found');
  }
}

function extractWeatherData(weatherData) {
  return {
    temp: weatherData.temp,
    feels_like: weatherData.feels_like,
    temp_min: weatherData.temp_min,
    temp_max: weatherData.temp_max,
    pressure: weatherData.pressure,
    humidity: weatherData.humidity,
  };
}

async function fetchWeatherData(city) {
  try {
    if (data[city]) {
      return extractWeatherData(data[city]);
    } else {
      throw new Error('city not found');
    }
  } catch (error) {
    throw new Error('An error occurred while fetching the weather data');
  }
}

async function cityWeather(city) {
  validateCity(city);
  return await fetchWeatherData(city.toLowerCase());
}

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    try {
      const data = await cityWeather(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };
  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError('');
    setWeather(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchWeather();
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type='text'
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Enter city name'
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <p>Temperature: {weather.temp}°C</p>
          <p>Feels Like: {weather.feels_like}°C</p>
          <p>Min Temperature: {weather.temp_min}°C</p>
          <p>Max Temperature: {weather.temp_max}°C</p>
          <p>Pressure: {weather.pressure} hPa</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
