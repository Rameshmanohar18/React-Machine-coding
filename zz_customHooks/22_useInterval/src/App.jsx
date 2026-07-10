// Step 1: Setup a count state and an isRunning state to control the interval
// Step 2: Pass callback and delay into useInterval — passing null as delay when isRunning is false to pause the interval
// Step 3: When isRunning is true, count increments every 1 second automatically
// Step 4: Start button sets isRunning to true, Stop button sets it to false (passes null as delay which pauses interval)
// Step 5: Reset button stops the interval and resets count back to 0

import { useState } from 'react';
import useInterval from './customHooks/useInterval';

export default function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setCount((prev) => prev + 1);
    },
    isRunning ? 1000 : null
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setCount(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}
