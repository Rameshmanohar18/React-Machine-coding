# Filter List with Debounce:

## Step 1: Setup in `App.jsx`

### What we do:

- Render the `FilterList` component.

### Code:

```jsx
import FilterList from './FilterList';

function App() {
  return <FilterList />;
}

export default App;
```

---

## Step 2: Create `FilterList.jsx` Component

This component handles user input, debouncing, and filtering the list.

### What we do:

- **useState** for:

  - `input` - to hold search input.
  - `pokemons` - to hold the list of Pokémon.

- **Debounce** the input change to avoid too many re-renders.

- **Filter Logic**:

  - Convert both Pokémon name and input to lowercase.
  - Check if the Pokémon name includes the input.

- **API Call Logic** with Local Storage Optimization:
  - Check if Pokémon data is already stored in `localStorage`.
  - If yes, use it.
  - If not, fetch from the API and save it in `localStorage`.

### Code:

```jsx
import { useState, useEffect, useCallback } from 'react';

// Custom debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function FilterList() {
  const [input, setInput] = useState('');
  const [pokemons, setPokemons] = useState([]);

  const handleInputChange = useCallback(
    debounce((value) => {
      setInput(value);
    }, 300),
    []
  );

  useEffect(() => {
    const dataFromStorage = localStorage.getItem('pokemons');
    if (dataFromStorage) {
      setPokemons(JSON.parse(dataFromStorage));
    } else {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('pokemons', JSON.stringify(data.results));
          setPokemons(data.results);
        });
    }
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <input
        type='text'
        placeholder='Search Pokémon'
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <ul>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterList;
```

---
