import React, { useState } from 'react';
import './CounterApp.css';

function CounterApp() {
  const [count, setCount] = useState<number>(0);
  const [incrementValue, setIncrementValue] = useState<number | string>(1);

  const handleIncrement = () => {
    setCount(count + Number(incrementValue));
  };

  const handleDecrement = () => {
    setCount(count - Number(incrementValue));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncrementValue(e.target.value);
  };

  return (
    <div className='counter-app'>
      <h2>Counter: {count}</h2>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <input
        type='number'
        value={incrementValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default CounterApp;
