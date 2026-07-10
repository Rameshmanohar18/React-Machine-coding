import React, { useState, createContext, useContext } from 'react';

// Creating a context
const ClickContext = createContext(null);

// Wrapper component that provides the click count and handler
export const ClickCounterWrapper = ({ children }) => {
  const [count, setCount] = useState(0);

  // Function to handle click events
  const incrementClickCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <ClickContext.Provider value={incrementClickCount}>
        <div>Click Count: {count}</div>
        {children}
    </ClickContext.Provider>
  );
};

// Child component that uses the context
export const ChildButton = () => {
  const handleClick = useContext(ClickContext);

  return <button onClick={handleClick}>Click me</button>;
};
