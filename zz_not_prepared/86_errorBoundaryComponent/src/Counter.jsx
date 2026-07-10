import React, { useEffect, useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  const handleCount = () => {
    setValue((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    if (value === 5) {
      throw new Error('hello error');
    }

    return () => {
      // Cleanup if needed
    };
  }, [value]);

  return (
    <>
      <button onClick={handleCount}>Click me (5 times!!)</button>
      <div>{value}</div>
    </>
  );
};

export default Counter;
