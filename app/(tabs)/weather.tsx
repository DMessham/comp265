import React, { useState } from 'react';

function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Weather App</h1>
      <button onClick={toggleUnit} style={styles.toggleButton}>
        Toggle to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <div style={styles.selectorContainer}>
        <label htmlFor="citySelector" style={styles.label}>
          Select a city:
        </label>
        <select
          id="citySelector"
          value={selectedCity}
          onChange={handleCityChange}
          style={styles.selector}
        >
          {weatherData.map((data, index) => (
            <option key={index} value={data.city}>
              {data.city}
            </option>
          ))}
        </select>
      </div>
      {selectedWeather ? (
        <div style={styles.weatherCard}>
          <p style={styles.city}>{selectedWeather.city}</p>
          <p style={styles.condition}>{selectedWeather.condition}</p>
          <p style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
          </p>
        </div>
      ) : (
        <p style={styles.loading}>No weather data available</p>
      )}
    </div>
  );


}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    color: '#cacaca',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '10px 20px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '1rem',
  },
  selector: {
    padding: '5px',
    fontSize: '1rem',
  },
  weatherCard: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px auto',
    width: '200px',
    textAlign: 'left',
    background: '#111'
  },
  city: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: '1rem',
    color: '#888',
  },
  temperature: {
    fontSize: '1.1rem',
    color: '#aaa',
  },
  loading: {
    fontSize: '1rem',
    color: '#999',
  },
};

export default WeatherApp;