# Click Counter with Context (React + useContext + Wrapper Component)

---

## App.jsx

```jsx
<ClickCounterWrapper>
  <ChildButton />
</ClickCounterWrapper>
```

---

## Step 1: ClickCounterWrapper.jsx

### i) Create a Context

```js
import { createContext, useState } from 'react';

export const ClickContext = createContext(null);
```

### ii) Wrapper Component

```js
const ClickCounterWrapper = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementClickCounter = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <ClickContext.Provider value={incrementClickCounter}>
      <div>Click Count: {count}</div>
      {children}
    </ClickContext.Provider>
  );
};

export default ClickCounterWrapper;
```

---

## Step 2: ChildButton.jsx

### Consuming Context

```js
import { useContext } from 'react';
import { ClickContext } from './ClickCounterWrapper';

const ChildButton = () => {
  const handleClick = useContext(ClickContext);

  return <button onClick={handleClick}>Click Me</button>;
};

export default ChildButton;
```

---

## Summary

| Component             | Purpose                                 |
| --------------------- | --------------------------------------- |
| `ClickCounterWrapper` | Provides context and manages count      |
| `ChildButton`         | Consumes context and triggers increment |

| Concept           | Details                                  |
| ----------------- | ---------------------------------------- |
| `createContext()` | Creates a global value for the tree      |
| `useContext()`    | Accesses context in child component      |
| Prop `children`   | Accepts nested components inside wrapper |

