// Inside TemperatureConverter.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) celsius ---> empty string ('') ---> holds celsius temperature value
// ii) fahrenheit ---> empty string ('') ---> holds fahrenheit temperature value

// Step 2:

// I'll directly jump on the return JSX template

// i) main div container
// ii) Inside main div we have h2 title and two input sections
// iii) Each input section contains:
//     - div wrapper
//     - label for accessibility
//     - input field with onChange handler

// JSX Structure:
// <div>
//   <h2>Temperature Converter</h2>
//   <div>
//     <label htmlFor='celsius'>Celsius:</label>
//     <input onChange={handleCelsiusChange} />
//   </div>
//   <div>
//     <label htmlFor='fahrenheit'>Fahrenheit:</label>
//     <input onChange={handleFahrenheitChange} />
//   </div>
// </div>

// CORE LOGIC --> handleCelsiusChange and handleFahrenheitChange
// i) both are accepting event as parameters

// for handleCelsiusChange -->
// i) extract value from e.target.value
// ii) setCelsius(value) to update celsius state
// iii) check if value is valid number using isValidNumber helper
// iv) if valid: convert celsius to fahrenheit using formula (C * 1.8 + 32)
// v) round result to 4 decimals and setFahrenheit
// vi) if invalid: setFahrenheit to empty string

// for handleFahrenheitChange -->
// i) extract value from e.target.value
// ii) setFahrenheit(value) to update fahrenheit state
// iii) check if value is valid number using isValidNumber helper
// iv) if valid: convert fahrenheit to celsius using formula ((F - 32) / 1.8)
// v) round result to 4 decimals and setCelsius
// vi) if invalid: setCelsius to empty string

// HELPER FUNCTIONS:

// isValidNumber function
const isValidNumber = (value) => {
  // i) check if value is not empty string
  // ii) check if value is not NaN (Not a Number)
  // iii) check if value is finite (not Infinity)
  return value !== '' && !isNaN(value) && isFinite(value);
};

// roundToFourDecimals function
const roundToFourDecimals = (num) => {
  // i) multiply by 10000 to shift decimal places
  // ii) use Math.round to round to nearest integer
  // iii) divide by 10000 to shift decimal places back
  return Math.round(num * 10000) / 10000;
};

// CONVERSION FORMULAS:
// Celsius to Fahrenheit: F = C × 1.8 + 32
// Fahrenheit to Celsius: C = (F - 32) ÷ 1.8

// VALIDATION LOGIC:
// i) Input validation happens on every keystroke
// ii) If input is valid number -> perform conversion and update other field
// iii) If input is invalid (letters, symbols, etc.) -> clear other field
// iv) Empty string is considered invalid, so other field gets cleared

// STATE MANAGEMENT:
// i) Each input controls its own state independently
// ii) Conversion only happens when input is valid
// iii) Invalid input immediately clears the corresponding field
// iv) No infinite loops because we only update the opposite field, not the current one
