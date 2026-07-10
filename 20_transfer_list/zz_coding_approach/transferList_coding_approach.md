# 🔁 Transfer List App:

## Step 1: Setup in `App.jsx`

### What we do:

- Render the `TransferList` component.

### Code:

```jsx
import TransferList from './TransferList';

function App() {
  return <TransferList />;
}

export default App;
```

---

## Step 2: Create `TransferList.jsx` Component

This component manages the logic for transferring list items.

### State Declarations:

- `listA`: Array with pre-filled data from `data.js`.
- `listB`: Initially empty array.

```jsx
// `data.js` (Sample Data)
export const data = [
  { id: 1, name: 'Apple', checked: false },
  { id: 2, name: 'Banana', checked: false },
  { id: 3, name: 'Cherry', checked: false },
  { id: 4, name: 'Date', checked: false },
  { id: 5, name: 'Elderberry', checked: false },
];
```

```jsx
import { useState } from 'react';
import ListComponent from './ListComponent';
import { data } from './data'; // [{ id: 1, name: 'Apple', checked: false }, ...]

function TransferList() {
  const [listA, setListA] = useState(data);
  const [listB, setListB] = useState([]);
```

---

## Step 3: JSX Structure

### What we do:

- Render two `ListComponent` components for List A and List B.
- In between, add two buttons for transferring selected items.

### Code:

```jsx
  const handleChange = (id, listType) => {
    const setList = listType === 'A' ? setListA : setListB;
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const transferFunc = (sourceList, setSource, setDestination) => {
    const toTransfer = sourceList.filter((item) => item.checked)
      .map((item) => ({ ...item, checked: false }));

    setDestination((dest) => dest.concat(toTransfer));
    setSource((source) => source.filter((item) => !item.checked));
  };

  return (
    <div>
      <ListComponent listData={listA} listType="A" handleChange={handleChange} />
      <div>
        <button onClick={() => transferFunc(listA, setListA, setListB)}>→</button>
        <button onClick={() => transferFunc(listB, setListB, setListA)}>←</button>
      </div>
      <ListComponent listData={listB} listType="B" handleChange={handleChange} />
    </div>
  );
}

export default TransferList;
```

✅ **Highlights**:

- The `handleChange` function toggles the `checked` state of an item.
- The `transferFunc` moves selected items from one list to the other.

---

## Step 4: Create `ListComponent.jsx`

A reusable component to render a list of items with checkboxes.

### Code:

```jsx
function ListComponent({ listData, listType, handleChange }) {
  return (
    <div className='list-box'>
      <h3>{`List ${listType}`}</h3>
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type='checkbox'
                onChange={() => handleChange(item.id, listType)}
                checked={item.checked}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListComponent;
```

---
