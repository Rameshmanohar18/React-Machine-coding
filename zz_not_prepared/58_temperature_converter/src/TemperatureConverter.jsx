import { useState } from 'react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const isValidNumber = (value) => {
    return value !== '' && !isNaN(value) && isFinite(value);
  };

  const roundToFourDecimals = (num) => {
    return Math.round(num * 10000) / 10000;
  };

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);

    if (isValidNumber(value)) {
      const celsiusNum = parseFloat(value);
      const fahrenheitValue = celsiusNum * 1.8 + 32;
      setFahrenheit(roundToFourDecimals(fahrenheitValue).toString());
    } else {
      setFahrenheit('');
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);

    if (isValidNumber(value)) {
      const fahrenheitNum = parseFloat(value);
      const celsiusValue = (fahrenheitNum - 32) / 1.8;
      setCelsius(roundToFourDecimals(celsiusValue).toString());
    } else {
      setCelsius('');
    }
  };

  return (
    <div>
      <h2>Temperature Converter</h2>

      <div>
        <label htmlFor='celsius'>Celsius:</label>
        <input
          id='celsius'
          type='text'
          value={celsius}
          onChange={handleCelsiusChange}
          placeholder='Enter temperature in Celsius'
        />
      </div>

      <div>
        <label htmlFor='fahrenheit'>Fahrenheit:</label>
        <input
          id='fahrenheit'
          type='text'
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          placeholder='Enter temperature in Fahrenheit'
        />
      </div>
    </div>
  );
}
