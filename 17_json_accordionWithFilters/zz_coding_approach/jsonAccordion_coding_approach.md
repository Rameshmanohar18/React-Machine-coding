## Step 1: Setup in `App.jsx`

Here, we set up the states and initial API call.

### What we do:

- Declare three `useState` hooks:

  - `data` - for API response.
  - `filter` - for selected filter category.
  - `categories` - for list of unique categories.

- In `useEffect`:
  - Fetch API data from `db.json`.
  - Set `data` using a helper function `processData()`.
  - Set `categories` using a `Set` to get unique values.

### Core Logic:

```jsx
import { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/db.json');
      const result = await response.json();

      // Setting unique categories
      const uniqueCategories = new Set(
        result.data.map((item) => item.category)
      );
      setCategories(['All', ...Array.from(uniqueCategories)]);

      // Setting processed data
      setData(processData(result.data));
    };

    fetchData();
  }, [filter]);

  // ... more code here
}

export default App;
```

✅ **Note**:

- `Set` ensures categories are unique.
- Every time the `filter` changes, `useEffect` re-runs.

---

## Step 2: Returning JSX in `App.jsx`

Here, we render two things:

- `CategoryFilter` component for selecting category.
- List of processed data using `map()`.

### Code:

```jsx
return (
  <div>
    <CategoryFilter
      categories={categories}
      onFilterChange={handleFilterChange}
    />
    {data.map((item) => renderObjective(item))}
  </div>
);
```

---

## Step 3: Create `CategoryFilter.jsx` (Dropdown)

This is a simple dropdown for categories.

### What we do:

- Accept `categories` and `onFilterChange` props.
- Render a `select` with `onChange` event to update the filter.

### Code:

```jsx
function CategoryFilter({ categories, onFilterChange }) {
  return (
    <select onChange={(e) => onFilterChange(e.target.value)}>
      {categories.map((categoryItem) => (
        <option key={categoryItem} value={categoryItem}>
          {categoryItem}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
```

---

### `handleFilterChange` in `App.jsx`:

```jsx
const handleFilterChange = (value) => {
  setFilter(value);
};
```

---

## Step 4: `processData` function

This function modifies the original API data by:

- Adding two new properties:

  - `keyResults`: children of the specific parent objective.
  - `visible`: for toggling visibility.

- Filter logic based on the selected category.

### Code:

```jsx
function processData(data) {
  let filteredData = data;

  if (filter !== 'All') {
    filteredData = data.filter((item) => item.category === filter);
  }

  const objectives = filteredData.filter(
    (item) => item.parent_objective_id === ''
  );

  objectives.forEach((obj) => {
    obj.keyResults = filteredData.filter(
      (item) => item.parent_objective_id === obj.id
    );
    obj.visible = true; // Initially visible
  });

  return objectives;
}
```

✅ **Highlights**:

- Only parent items (`parent_objective_id === ''`) are considered top-level.
- Each parent gets their child objectives in `keyResults`.

---

## Step 5: Render Each Objective

We define a function to render each objective.

### `renderObjective` function:

```jsx
function renderObjective(obj) {
  return (
    <div key={obj.id}>
      <div>
        <span onClick={() => toggleVisibility(obj.id)}>
          {obj.visible ? '[-]' : '[+]']
        </span>
        <span>👤</span>
        <span>{obj.title}</span>
      </div>
      {obj.visible && (
        <div>
          {obj.keyResults.map(child => (
            <div key={child.id}>
              <span>{child.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

✅ **Explanation**:

- Click the toggle to expand/collapse child items.
- Show the parent title and the list of child `keyResults` if `visible` is true.

---

## Step 6: Toggle Visibility

This function toggles the visibility of a parent objective.

### Code:

```jsx
const toggleVisibility = (id) => {
  const newData = data.map((item) => {
    if (item.id === id) {
      return { ...item, visible: !item.visible };
    }
    return item;
  });
  setData(newData);
};
```

✅ **Highlights**:

- Toggle `visible` flag for the clicked parent.
- Update the state using `setData(newData)`.

---
