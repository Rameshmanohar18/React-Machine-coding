import { useState, useCallback, useEffect } from 'react';

export default function Autocomplete({ onSelectItem = () => {} }) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
  const DEBOUNCE_DELAY = 500;

  const fetchAPI = useCallback((searchQuery) => {
    if (!searchQuery) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(ITEMS_API_URL);
        const data = await response.json();
        const filtered = data
          .filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((post) => post.title)
          .slice(0, 10);
        setItems(filtered);
      } catch (error) {
        console.log(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  useEffect(() => {
    fetchAPI(query);
  }, [query, fetchAPI]);

  const controlClass = `control${loading ? ' is-loading' : ''}`;

  return (
    <div className='wrapper'>
      <div className={controlClass}>
        <input
          type='text'
          className='input'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts... (try 'qui' or 'est')"
        />
      </div>
      {items.length > 0 && (
        <div className='list is-hoverable'>
          {items.map((item, index) => (
            <a
              key={index}
              className='list-item'
              onClick={() => onSelectItem(item)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
