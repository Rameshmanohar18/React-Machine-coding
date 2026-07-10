// This is the main landing page component.
// It handles searching for cocktails via query params, fetches data from API, and renders the list.

import { useEffect, useState } from 'react';
// Hook for handling URL search params (query strings).
import { useSearchParams } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import axios from 'axios';

// API endpoint for searching cocktails by name.
const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const Landing = () => {
  // Hook to get and set URL search params (e.g., ?search=margarita).
  const [searchParams, setSearchParams] = useSearchParams();
  // Extracts 'search' param or defaults to 'margarita'.
  // Example: URL 'http://localhost:5173/?search=gin' → searchTerm = 'gin'.
  // Input: searchParams object.
  // Output: String value of 'search' param or default.
  const searchTerm = searchParams.get('search') || 'margarita';
  // State for storing fetched drinks data (array of objects).
  const [drinks, setDrinks] = useState([]);
  // State for loading indicator during API fetch.
  const [loading, setLoading] = useState(true);

  // Async function to fetch cocktails based on searchTerm.
  const fetchCocktails = async () => {
    try {
      // Set loading to true before fetch.
      setLoading(true);
      // Axios GET request to API with searchTerm appended.
      // Example: searchTerm = 'margarita' → URL: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'.
      // Input: searchTerm (string).
      // Output: { data: { drinks: [{...}, {...}] } } or empty array on error.
      const { data } = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      // Set drinks to data.drinks or empty array if none found.
      setDrinks(data.drinks || []);
    } catch (error) {
      console.error('Error fetching cocktails', error);
      setDrinks([]);
    } finally {
      // Always set loading to false after fetch.
      setLoading(false);
    }
  };

  // Run fetchCocktails whenever searchTerm changes.
  // Output: Updated drinks state.
  useEffect(() => {
    fetchCocktails();
  }, [searchTerm]);

  return (
    <>
      {/* SearchForm component for input, passes current searchTerm and setter. */}
      <SearchForm searchTerm={searchTerm} setSearchParams={setSearchParams} />
      {/* Conditional: Show loading message or CocktailList with drinks. */}
      {loading ? (
        <h4 style={{ textAlign: 'center' }}>Loading...</h4>
      ) : (
        <CocktailList drinks={drinks} />
      )}
    </>
  );
};

export default Landing;
