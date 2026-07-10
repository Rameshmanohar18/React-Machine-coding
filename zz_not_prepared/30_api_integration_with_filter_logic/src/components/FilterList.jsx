import React, { useState, useEffect, useMemo, useCallback } from 'react';

// This is helpful to avoid excessive updates from rapid events such as typing.
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Clear the existing timer on each call to ensure delay reset
    timer = setTimeout(() => {
      func.apply(this, args); // Apply the function after the specified delay
    }, delay);
  };
};

// memoize the PokemonItem component to prevent unnecessary re-renders
// if the props (in this case, 'name') have not changed.
const PokemonItem = React.memo(({ name }) => {
  return <li>{name}</li>;
});

const FilterList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // Function to fetch pokemon data from the API or local storage
  const fetchData = async () => {
    try {
      // Attempt to retrieve data from local storage
      let data = localStorage.getItem('pokemons');
      if (data) {
        // Set pokemons from local storage if available
        setPokemons(JSON.parse(data));
      } else {
        // Fetch data from the API
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        data = await response.json();

        // Store fetched data in local storage
        localStorage.setItem('pokemons', JSON.stringify(data.results));

        // Set pokemons from fetched data
        setPokemons(data.results);
      }
      // Reset error state on successful data fetching
      setError('');
    } catch (error) {
      // Set error message on failure
      setError('Failed to fetch data');
      console.error('There was an error fetching the Pokémon data:', error);
    }
  };

  // useEffect to trigger fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Use useCallback to create a stable reference for the debounced input change handler
  // This prevents the creation of a new function on every render
  const handleInputChange = useCallback(
    debounce((value) => {
      setInput(value); // Set the input value which triggers re-render and filtering
    }, 300),
    []
  );

  //  const handleInputChange = debounce((value) => {
  //    setInput(value);
  //  }, 300);

  // useMemo to compute filteredPokemons only when 'input' or 'pokemons' changes
  // This optimizes performance by avoiding unnecessary recalculations
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, pokemons]);

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='Filter by Pokémon name'
      />
      {/* display error message if present */}
      {error && <p>{error}</p>}
      <ul>
        {filteredPokemons.map((pokemon) => (
          // Render each filtered pokemon
          <PokemonItem key={pokemon.name} name={pokemon.name} />
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
