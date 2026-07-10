// Step 1: useCountdown accepts an options object with { countStart, countStop = 0, intervalMs = 1000 } params
// Step 2: Create count state initialized to countStart, and an isRunning state initialized to false
// Step 3: Inside useEffect, if isRunning is false clear and return early — interval only runs when isRunning is true
// Step 4: If isRunning is true, set an interval that decrements count by 1 every intervalMs milliseconds
// Step 5: Inside the interval, use functional update (prev => prev - 1) to always get latest count value
// Step 6: If count reaches countStop, automatically stop by setting isRunning to false
// Step 7: Cleanup clears the interval on every re-run and on unmount
// Step 8: Define start, stop, reset using useCallback with [] — memoized stable references across re-renders
// Step 9: Return { count, start, stop, reset } so consumer can control the countdown

import { useState, useEffect, useCallback } from 'react';

const useCountdown = ({ countStart, countStop = 0, intervalMs = 1000 }) => {
  const [count, setCount] = useState(countStart);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev <= countStop) {
          setIsRunning(false);
          clearInterval(intervalId);
          return prev;
        }
        return prev - 1;
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isRunning, countStop, intervalMs]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setCount(countStart);
  }, [countStart]);

  return { count, start, stop, reset };
};

export default useCountdown;