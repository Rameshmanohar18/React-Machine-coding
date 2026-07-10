// Step 1: Inside App.jsx component, I simply mention the CountriesPage.jsx component
// Step 2: Inside CountriesPage Component,
// useState Declaration:
// i) countries,
// ii) filter

// Step 3: return jsx part, which has input type='text', onChange = {handleFilterChange}
const handleFilterChange = (e) => {
  setFilter(e.target.value);
};

// CORE Logic is to perform .map operation on filteredCountries
// Ex:
{
  filteredCountries.map((country, index) => (
    <Country
      key={index}
      name={country.name.common}
      capital={country.capital?.[0]}
    />
  ));
}

// You can get this filteredCountries with the help of countriesVar.filter logic
// Ex;
const filteredCountries = countries.filter((country) =>
  country.capital?.[0].toLowerCase().includes(filter.toLowerCase())
);

// We have an empty dependency array --> useEffect to fetch the api call and setCountries(data)

// ----- Basic Component //

function Country({ name, capital }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{capital}</p>
    </div>
  );
}
