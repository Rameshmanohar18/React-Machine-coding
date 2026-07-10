// Inside App.jsx, we are maintaining Weather.jsx
// Step 1: Import external data and define constants

// Ex: Import weather data from JSON file
import data from '../../public/data.json';
// This contains pre-stored weather data for different cities

// Define valid cities array
const VALID_CITIES = ['bogota', 'tokyo', 'madrid', 'paris', 'washington'];
// This is our whitelist of cities we have weather data for

// Step 2: Utility functions for validation and data processing

// Ex: validateCity function - checks if city input is valid
function validateCity(city) {
  // Step (i): Check if input is actually a string
  if (typeof city !== 'string') {
    throw new Error('not a string');
  }
  // Step (ii): Check if string is empty after removing spaces
  if (city.trim() === '') {
    throw new Error('string is empty');
  }
  // Step (iii): Check if city exists in our valid cities list
  if (!VALID_CITIES.includes(city.trim().toLowerCase())) {
    throw new Error('city not found');
  }
}

// Ex: extractWeatherData function - picks only needed data from full weather object
function extractWeatherData(weatherData) {
  return {
    temp: weatherData.temp,
    feels_like: weatherData.feels_like,
    temp_min: weatherData.temp_min,
    temp_max: weatherData.temp_max,
    pressure: weatherData.pressure,
    humidity: weatherData.humidity,
  };
  // This filters out unnecessary data and returns only what we want to display
}

// Ex: fetchWeatherData function - simulates API call but uses local data
async function fetchWeatherData(city) {
  try {
    // Step (i): Check if city exists in our data object
    if (data[city]) {
      return extractWeatherData(data[city]);
    } else {
      throw new Error('city not found');
    }
  } catch (error) {
    throw new Error('An error occurred while fetching the weather data');
  }
}

// Ex: cityWeather function - main orchestrator function
async function cityWeather(city) {
  // Step (i): First validate the city input
  validateCity(city);
  // Step (ii): If validation passes, fetch the weather data
  return await fetchWeatherData(city.toLowerCase());
}

// Step 3: Inside Weather.jsx, we will start with useState variables declaration

// Ex: The very first useState variable
const [city, setCity] = useState('');
// This holds whatever the user types in the input box - starts empty

// The second useState variable will be related to weather data
const [weather, setWeather] = useState(null);
// This holds the fetched weather information - starts as null (no data)

// The third useState variable will be related to error handling
const [error, setError] = useState('');
// This holds any error messages to show user - starts empty

// Step 4: handleFetchWeather function, this runs when user clicks "Get Weather" or presses Enter
// Ex: when user types "tokyo" and clicks button
const handleFetchWeather = async () => {
  try {
    // Step (i): Call our main weather function with current city input
    const data = await cityWeather(city);
    // Step (ii): If successful, update weather state with returned data
    setWeather(data);
    // Step (iii): Clear any previous error messages
    setError('');
  } catch (err) {
    // Step (iv): If anything fails, show error message and clear weather data
    setError(err.message);
    setWeather(null);
  }
};

// Step 5: handleInputChange function, this runs every time user types in input box
// Ex: when user types each letter of "tokyo"
const handleInputChange = (e) => {
  // Step (i): Update city state with what user typed
  setCity(e.target.value);
  // Step (ii): Clear previous error messages (fresh start for new input)
  setError('');
  // Step (iii): Clear previous weather data (clean slate)
  setWeather(null);
};

// Step 6: handleKeyPress function, this runs when user presses any key in input box
// Ex: when user presses Enter key after typing city name
const handleKeyPress = (e) => {
  // Step (i): Check if user pressed Enter key
  if (e.key === 'Enter') {
    // Step (ii): Trigger weather fetch (same as clicking button)
    handleFetchWeather();
  }
};

// Step 7: Return JSX structure
// Input box with change and keypress handlers
// Button that triggers weather fetch
// Conditional error message display
// Conditional weather data display
