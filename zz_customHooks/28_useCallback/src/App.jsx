import { useState } from 'react';
import useCallbackCustom from './customHooks/useCallback';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallbackCustom(() => {
    console.log(`Clicked — current count is ${count}`);
  }, [count]);

  const handleHover = useCallbackCustom(() => {
    console.log('Hovered — this function never changes reference');
  }, []);

  // purely to verify memoization in console on every render
  console.log('handleHover reference:', handleHover);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count
      </button>
      <button onClick={handleClick}>Trigger handleClick</button>
      <button onMouseEnter={handleHover}>Hover me</button>
    </div>
  );
}
