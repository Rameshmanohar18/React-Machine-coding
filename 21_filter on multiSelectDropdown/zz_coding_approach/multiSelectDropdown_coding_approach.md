## 🛠️ Step 1: Setup in `App.jsx`

### 1. Sample Data

Define a list of items with `id`, `category`, and `name`.

```jsx
const data = [
  { id: 1, category: 'electronics', name: 'Laptop' },
  { id: 2, category: 'books', name: 'Novel' },
  { id: 3, category: 'electronics', name: 'Smartphone' },
];
```

### 2. Options for Filtering

Define the options for the multi-select dropdown.

```jsx
const options = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books' },
];
```

### 3. State Declarations

- `filters`: Array to hold selected filters.
- `filteredData`: Initially holds the full `data` array.

```jsx
import { useState, useEffect } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';

function App() {
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
```

### 4. Filtering Logic

Use an `useEffect` to update `filteredData` whenever `filters` change.

```jsx
useEffect(() => {
  if (filters.length === 0) {
    setFilteredData(data);
  } else {
    setFilteredData(data.filter((item) => filters.includes(item.category)));
  }
}, [filters]);
```

### 5. Handle Filter Changes

```jsx
const handleFilterChange = (selectedOptions) => {
  setFilters(selectedOptions);
};
```

### 6. Return JSX

Render the `MultiSelectDropdown` and display the filtered items.

```jsx
return (
  <div>
    <MultiSelectDropdown options={options} onChange={handleFilterChange} />
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
  );
}

export default App;
```

✅ **Highlights**:

- If no filters are selected, show all data.
- If filters are selected, show only items that match.

---

## 🛠️ Step 2: Create `MultiSelectDropdown.jsx` Component

This component renders a multiple-select dropdown and manages its internal state.

### 1. State Declaration

```jsx
function MultiSelectDropdown({ options, onChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
```

### 2. Handle Change

Capture selected options and notify the parent component.

```jsx
const handleChange = (event) => {
  const selectedValues = Array.from(
    event.target.selectedOptions,
    (option) => option.value
  );

  setSelectedOptions(selectedValues);
  onChange(selectedValues);
};
```

### 3. Return JSX

Render the `select` element with multiple selection enabled.

```jsx
return (
  <select multiple value={selectedOptions} onChange={handleChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
}

export default MultiSelectDropdown;
```

✅ **Highlights**:

- `multiple` attribute allows multiple selections.
- Selected options are passed back to the parent via `onChange`.

---
