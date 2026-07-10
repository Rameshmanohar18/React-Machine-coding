# TypeAhead Component Guide (React + GitHub API + Debounce with AbortController)

---

## App.jsx

* Import and render the `TypeAhead.jsx` component

```jsx
<TypeAhead />
```

---

## TypeAhead.jsx Breakdown

### Step 1: useState Declarations

```js
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
```

---

## Step 2: JSX Return Structure

```jsx
<div className="typeahead-container">
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search GitHub users..."
  />

  {loading && <p>Loading...</p>}

  <ul>
    {results.map((user) => (
      <li key={user.id}>
        <img src={user.avatar_url} alt={user.login} width="30" height="30" />
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.login}
        </a>
      </li>
    ))}
  </ul>
</div>
```

---

## Step 3: Core Logic with Debounce and AbortController

```js
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;
  const minLength = 3;

  const timeoutId = setTimeout(() => {
    if (query.length >= minLength) {
      setLoading(true);
      fetch(`https://api.github.com/search/users?q=${query}`, { signal })
        .then((res) => res.json())
        .then((data) => {
          setResults(data.items || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error(err);
          }
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, 500); // debounce delay

  return () => {
    clearTimeout(timeoutId);
    controller.abort();
  };
}, [query]);
```

---

## Summary

| State     | Purpose                                 |
| --------- | --------------------------------------- |
| `query`   | User input text                         |
| `results` | API response from GitHub users endpoint |
| `loading` | Shows loading feedback while fetching   |

| Feature         | Logic                                           |
| --------------- | ----------------------------------------------- |
| Input           | Triggers search logic on change                 |
| Debounce        | Limits API calls via `setTimeout`               |
| AbortController | Cancels previous API request on new input       |
| GitHub API      | `https://api.github.com/search/users?q=<query>` |
| Result View     | Image + link to user's GitHub profile           |

