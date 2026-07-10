# 🍸 Cocktail App: Step-by-Step React (Router DOM) Tutorial

Welcome to a beginner-friendly guide to building a **Cocktail Search App** using **React Router DOM**. Follow these simple steps to understand the complete flow and improve your coding skills!

---

## Step 1: Setting up the Router in `App.jsx`

First, we define the routes for our app.

### What we do:

- **RouterProvider** helps to connect our app with routes.
- We create a router using `createBrowserRouter()`, where we define:
  - `path`: URL path
  - `element`: Which component to load
  - `children`: Nested routes (sub-pages)

### Code Example:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './HomeLayout';
import Landing from './Landing';
import Cocktail from './Cocktail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'cocktail/:id', element: <Cocktail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

✅ **Note**:

- `index: true` means this is the default page (`Landing`) for `/`.
- `cocktail/:id` is a dynamic route to show details for a specific cocktail.

---

## Step 2: Create `HomeLayout.jsx` (Page Layout)

This component controls the layout and handles page loading.

### What we do:

- Use the `useNavigation` hook to detect loading state.
- Always show the **Navbar**.
- If the page is loading, show a simple **Loading...** text.
- Otherwise, show the main page content using `<Outlet />`.

### Code Example:

```jsx
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Navbar />
      {isPageLoading ? <div>Loading...</div> : <Outlet />}
    </>
  );
}

export default HomeLayout;
```

---

## Step 3: Build `Landing.jsx` (Home Page)

This is the main page where users can search for cocktails.

### What we do:

- Use **Google API** for cocktail search.
- Use `useSearchParams` to read/write URL search queries.
- Manage two states:
  - `drinks` - to store API results.
  - `loading` - to show loading indicator.

### Code Example:

```jsx
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import CocktailList from './CocktailList';

function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCocktails = async () => {
    setLoading(true);
    const searchTerm = searchParams.get('search') || '';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    const response = await fetch(url);
    const data = await response.json();
    setDrinks(data.drinks || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCocktails();
  }, [searchParams]);

  return (
    <div>
      <SearchForm
        searchTerm={searchParams.get('search') || ''}
        setSearchParams={setSearchParams}
      />
      <CocktailList drinks={drinks} loading={loading} />
    </div>
  );
}

export default Landing;
```

---

## Step 4: Create `SearchForm.jsx` (Search Bar)

This component lets users search for cocktails.

### What we do:

- Accept `searchTerm` and `setSearchParams` as props.
- Handle form submit to set the URL search param.
- No `onClick` needed for the button — it's handled by form submit.

### Code Example:

```jsx
function SearchForm({ searchTerm, setSearchParams }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams({ search: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='search' name='search' defaultValue={searchTerm} />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchForm;
```

---

## Step 5: Create `CocktailList.jsx` (Show List)

This component displays a list of cocktails.

### What we do:

- Accept `drinks` as props.
- Format the drinks data (pick only necessary fields).
- Map through drinks and render each `CocktailCard`.

### Code Example:

```jsx
import CocktailCard from './CocktailCard';

function CocktailList({ drinks }) {
  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  return (
    <div>
      {formattedDrinks.map((item) => (
        <CocktailCard key={item.id} {...item} />
      ))}
    </div>
  );
}

export default CocktailList;
```

---

## Step 6: Create `CocktailCard.jsx` (Each Cocktail)

This component shows the cocktail details in a card format.

### What we do:

- Accept props like `id`, `image`, `name`, `info`, `glass`.
- Show the cocktail image and details.
- Add a **Link** to see full details of the cocktail.

### Code Example:

```jsx
import { Link } from 'react-router-dom';

function CocktailCard({ id, image, name, info, glass }) {
  return (
    <div>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{glass}</p>
      <p>{info}</p>
      <Link to={`/cocktail/${id}`}>Details</Link>
    </div>
  );
}

export default CocktailCard;
```

---

## Step 7: Create `Cocktail.jsx` (Cocktail Details Page)

This page shows details about a single cocktail.

### What we do:

- Get `id` from the URL using `useParams`.
- Use `useNavigate` to allow the user to go back.
- Fetch cocktail details based on `id`.
- Show the full cocktail details.

### Code Example:

```jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Cocktail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrink = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setDrink(data.drinks ? data.drinks[0] : null);
      setLoading(false);
    };
    fetchDrink();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!drink) {
    return <div>No cocktail found!</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{drink.strDrink}</h2>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} />
    </div>
  );
}

export default Cocktail;
```

---
