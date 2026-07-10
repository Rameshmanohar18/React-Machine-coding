// Step 1: Setup original and throttled counters as state, both start at 0
// Step 2: Pass a callback to useThrottle that increments throttled — fires at most once per 1000ms
// Step 3: handleMouseMove increments original on every mousemove (unthrottled) and also calls handleThrottled
// Step 4: handleThrottled internally checks the timestamp — only increments throttled if 1s has passed since last call
// Step 5: Attach handleMouseMove to the div's onMouseMove — move mouse fast, original shoots up, throttled ticks slowly
// Step 6: Display both counters to make the throttle effect clearly visible

import { useState } from 'react';
import useThrottle from './customHooks/useThrottle';

export default function App() {
  const [original, setOriginal] = useState(0);
  const [throttled, setThrottled] = useState(0);

  const handleThrottled = useThrottle(() => {
    setThrottled((prev) => prev + 1);
  }, 1000);

  const handleMouseMove = () => {
    setOriginal((prev) => prev + 1);
    handleThrottled();
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <p>Original (every mousemove): {original}</p>
      <p>Throttled (once per 1s): {throttled}</p>
    </div>
  );
}
