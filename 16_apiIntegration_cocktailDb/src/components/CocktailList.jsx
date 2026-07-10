// This component renders a list of CocktailCard components.
// Handles empty list case and formats API data for cards.

import CocktailCard from './CocktailCard';

const CocktailList = ({ drinks }) => {
  // Check if no drinks or empty array.
  if (!drinks || drinks.length === 0) {
    // Render message for no results.
    return (
      <h4 style={{ textAlign: 'center' }}>No matching cocktails found...</h4>
    );
  }

  // Format drinks data to match CocktailCard props.
  // Example: drinks = [{ idDrink: '11022', strDrink: 'Margarita', ... }] → formattedDrinks = [{ id: '11022', name: 'Margarita', ... }]
  // Input: drinks array from API.
  // Output: Array of objects with renamed keys.
  const formattedDrinks = drinks.map(
    ({ idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass }) => ({
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    })
  );

  return (
    <div className='cocktail-list'>
      {/* Map over formatted drinks and render CocktailCard for each. */}
      {/* Example: 3 drinks → Renders 3 <CocktailCard /> components. */}
      {formattedDrinks.map((item) => (
        <CocktailCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CocktailList;
