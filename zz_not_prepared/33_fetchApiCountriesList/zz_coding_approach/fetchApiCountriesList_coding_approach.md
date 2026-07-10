
##  Step 1: Setup in `App.jsx`

### What we do:

- Render the `CountriesPage` component.

### Code:

```jsx
import CountriesPage from './CountriesPage';

function App() {
  return <CountriesPage />;
}

export default App;
```

---

##  Step 2: Create `CountriesPage.jsx` Component

This component handles fetching and filtering the list of countries.

### State Declarations:

- `countries`: Array to store countries data.
- `filter`: String to store search term.

```jsx
import { useState, useEffect } from 'react';
import Country from './Country';

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.capital?.[0].toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by capital..."
        onChange={handleFilterChange}
      />
      <div>
        {filteredCountries.map((country, index) => (
          <Country
            key={index}
            name={country.name.common}
            capital={country.capital?.[0]}
          />
        ))}
      </div>
    </div>
  );
}

export default CountriesPage;
```

✅ **Highlights**:
- Input field captures the search term.
- Filtered countries based on capital city name (case-insensitive).
- API call happens once on mount (`useEffect` with empty dependency array).

---

##  Step 3: Create `Country.jsx` Component

This is a basic component to display individual country details.

### Code:

```jsx
function Country({ name, capital }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{capital}</p>
    </div>
  );
}

export default Country;
```

---

