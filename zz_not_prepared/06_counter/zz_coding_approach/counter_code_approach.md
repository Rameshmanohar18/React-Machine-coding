# Counter Component Guide (React + TypeScript)

---

## App.tsx

- Import and render the `Counter.tsx` component

```tsx
<Counter />
```

---

## Counter.jsx Breakdown

### Step 1: State Management

```jsx
const [count, setCount] = useState(0);
const [incrementValue, setIncrementValue] = useState(1);
```

### Step 2: Increment Handler

```jsx
const handleIncrement = () => {
  setCount(count + Number(incrementValue));
};
```

### Step 3: Decrement Handler

```jsx
const handleDecrement = () => {
  setCount(count - Number(incrementValue));
};
```

### Step 4: Handle Change for Increment Value Input

```jsx
const handleIncrementValueChange = (e) => {
  setIncrementValue(Number(e.target.value));
};
```

---

## JSX Structure

```jsx
<div className='counter'>
  <h2>Count: {count}</h2>

  <input
    type='number'
    value={incrementValue}
    onChange={handleIncrementValueChange}
  />

  <button onClick={handleDecrement}>-</button>
  <button onClick={handleIncrement}>+</button>
</div>
```

---

## Summary

| Feature      | Logic                               |
| ------------ | ----------------------------------- |
| State        | `count`, `incrementValue`           |
| Increment    | `setCount(count + incrementValue)`  |
| Decrement    | `setCount(count - incrementValue)`  |
| Input Update | `setIncrementValue` from user input |
