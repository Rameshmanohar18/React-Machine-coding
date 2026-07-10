// Step 1: Inside App.jsx component, I will simply use FilterList.jsx component
// Step 2: I have a custom debounce function and I'm using this in onChange

const handleInputChange = useCallback(
  (debounce((value) => {
    setInput(value);
  }, 300),
  [])
);

// CORE LOGIC is to whatever we are typing we have to filter the savedPokemons

// Ex: const filteredPokemons = pokemons.filter((pokemon)=> pokemon.name.toLowerCase().includes(input.toLowerCase()))
// And simply map this filteredPokemons and return an li of each pokemon

// API Call logic --> We are using localStorage ---> Optional Enhancement
// 1st attempt to check if (dataIsInLocalStorage) --> If yes ---> setPokemons(JSON.parse(dataIsInLocalStorage))
// else to perform an API call and localStorage.setItem ---> and setPokemons(data.results)
