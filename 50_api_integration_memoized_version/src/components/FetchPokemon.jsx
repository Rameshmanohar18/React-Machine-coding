// limit: This parameter specifies the maximum number of items to return in the response.
// limit=20 means the API will return up to 20 items in a single response.
// offset: This parameter controls where in the sequence of available data the output should start.
// So offset=220 means that the API should skip the first 40 items and start returning from the 21st item.

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Constant defining the base URL for the Pokémon API.
const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const FetchPokemon = () => {
  // State for storing the total number of Pokémon available in the API. (ex: 1302 is the count)
  const [totalCount, setTotalCount] = useState(null);

  // State for setting the number of Pokémon to be fetched per page.
  const [limit, setLimit] = useState(5);

  // State for setting the starting point of data fetching in the list of Pokémon.
  const [offset, setOffset] = useState(0);

  // State for storing the fetched Pokémon data.
  const [data, setData] = useState([]);

  // State for storing the URL needed to fetch the next page of Pokémon.
  const [nextUrl, setNextUrl] = useState(null);

  // State for caching the fetched data to reduce unnecessary API calls.
  const [cache, setCache] = useState({});

  // Effect hook for fetching initial Pokémon data when the component mounts or when 'limit' or 'offset' changes.
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Constructing the URL with the current limit and offset.
        const url = `${API_BASE_URL}?limit=${limit}&offset=${offset}`;
        const response = await fetch(url);
        const result = await response.json();

        // Setting the total count of Pokémon from the API's response.
        setTotalCount(result.count);

        // Storing the fetched Pokémon data.
        setData(result.results);

        // Storing the URL for the next batch of Pokémon data.
        setNextUrl(result.next);

        // Caching the current fetch results to optimize future requests.
        // cache: {'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0': [{name:'', url:''},{name:'', url:''},{name:'', url:''}]}
        setCache((prevCache) => ({ ...prevCache, [url]: result.results }));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, [limit, offset]);

  // Callback for fetching data when the 'Next' button is clicked.
  const fetchData = useCallback(async () => {
    if (cache[nextUrl]) {
      // If the next URL's data is already cached, use it directly.
      setData(cache[nextUrl]);
      return;
    }
    try {
      const response = await fetch(nextUrl);
      const result = await response.json();

      // Update the data with the new batch from the next URL.
      setData(result.results);

      // Update the next URL for further pagination.
      setNextUrl(result.next);

      // Update the cache with the new data.
      setCache((prevCache) => ({ ...prevCache, [nextUrl]: result.results }));
    } catch (error) {
      console.error('Error fetching next set of data:', error);
    }
  }, [nextUrl, cache]);

  // Callback for handling changes in the dropdown that sets how many Pokémon to fetch per page.
  const handleLimitChange = useCallback((event) => {
    setLimit(parseInt(event.target.value, 10));

    // Resetting the offset to 0 to start from the beginning of the list with the new limit.
    setOffset(0);
  }, []);

  // Button click handler for loading the next set of Pokémon.
  const handleNextClick = useCallback(() => {
    if (nextUrl) {
      // If there is a URL to fetch the next set of data, invoke fetchData.
      fetchData();
    }
  }, [fetchData]);

  // Memo hook for calculating the dropdown options based on the totalCount.
  // Ex: options : [{"value": 5,"label": 5}, {"value": 10,"label": 10}]
  const options = useMemo(() => {
    return [...Array(Math.ceil(totalCount / 5))].map((_, index) => ({
      value: (index + 1) * 5,
      label: (index + 1) * 5,
    }));
  }, [totalCount]);

  return (
    <div>
      {/* Render dropdown only if totalCount is available. */}
      {totalCount && (
        <select onChange={handleLimitChange} value={limit}>
          {/* Mapping over options to render them as dropdown items. */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {/* List of Pokémon names. */}
      <ul>
        {data.map((pokemon, index) => (
          <div key={index}>
            {index + 1}. {pokemon.name}
          </div>
        ))}
      </ul>
      {/* Button to fetch the next batch of Pokémon. */}
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default FetchPokemon;
