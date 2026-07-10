// This component displays details for a single cocktail based on ID in URL params.

// Importing React hooks.
import { useEffect, useState } from 'react';
// Hooks for URL params and navigation.
import { useParams, useNavigate } from 'react-router-dom';
// Axios for API requests.
import axios from 'axios';

// API endpoint for fetching a single cocktail by ID.
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const Cocktail = () => {
  // Extract 'id' from URL params (e.g., '/cocktail/11022' → id = '11022').
  const { id } = useParams();
  // Hook for programmatic navigation (e.g., back button).
  const navigate = useNavigate();
  // State for the drink data (object or null).
  const [drink, setDrink] = useState(null);
  // State for loading during fetch.
  const [loading, setLoading] = useState(true);

  // Effect hook: Fetch drink on mount or id change.
  useEffect(() => {
    // Async fetch function.
    const fetchDrink = async () => {
      try {
        // Set loading true.
        setLoading(true);
        // Axios GET with id appended.
        // Example: id = '11022' → URL: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11022'.
        // Input: id (string).
        // Output: { data: { drinks: [{...}] } } or null if not found.
        const { data } = await axios.get(`${singleCocktailUrl}${id}`);
        // Set drink to first item or null.
        setDrink(data.drinks?.[0] || null);
      } catch (error) {
        // Log error.
        console.error('Error fetching cocktail:', error);
      } finally {
        // Set loading false.
        setLoading(false);
      }
    };

    fetchDrink();
  }, [id]);

  // Early return for loading state.
  if (loading) return <h4 style={{ textAlign: 'center' }}>Loading...</h4>;
  // Early return if no drink found.
  if (!drink)
    return <h4 style={{ textAlign: 'center' }}>No cocktail found...</h4>;

  // Destructure drink properties for display.
  // Example: drink = { strDrink: 'Margarita', ... } → name = 'Margarita', etc.
  // Input: drink object.
  // Output: Extracted variables for rendering.
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = drink;

  // OPTIONAL: Code for extracting ingredients (commented out).
  // const ingredients = Object.keys(drink)
  //   .filter((key) => key.startsWith('strIngredient') && drink[key])
  //   .map((key) => drink[key]);
  // Example: drink = { strIngredient1: 'Tequila', strIngredient2: 'Lime', ... } → ingredients = ['Tequila', 'Lime', ...]

  return (
    <section className='cocktail-page'>
      <header>
        {/* Back button: Navigates to previous page. */}
        {/* Example: Click → navigate(-1) goes back in history (e.g., to '/'). */}
        <button className='btn' onClick={() => navigate(-1)}>
          back home
        </button>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        {/* Drink image. */}
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          {/* Display name. */}
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          {/* OPTIONAL: Ingredients display (commented out). */}
          {/* <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((item, index) => (
              <span className='ing' key={index}>{item}{index < ingredients.length - 1 ? ', ' : ''}</span>
            ))}
          </p> */}
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cocktail;
