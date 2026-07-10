// In summary, using AbortController and signal in a typeahead implementation helps manage API requests more efficiently, ensures the accuracy of displayed results, and provides a better overall user experience.

import { useState, useEffect } from 'react';
import { fetchUsers } from './services/swapiService';

const Typeahead = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const minLength = 3;
    // helps us to delay the api call trigger
    const debounceId = setTimeout(() => {
      if (query.length >= minLength) {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        fetchUsers(query, signal)
          .then((data) => {
            setResults(data.items || []);
            setLoading(false);
          })
          .catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Fetch error:', error);
              setLoading(false);
            }
          });

        return () => controller.abort();
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceId);
  }, [query]);

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for Github Users'
      />
      {loading && <div>Loading...</div>}
      <ul>
        {results.map((user) => (
          <li key={user.id} style={{ display: 'flex' }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width='30'
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <a href={user.html_url} target='_blank' rel='noopener noreferrer'>
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Typeahead;
