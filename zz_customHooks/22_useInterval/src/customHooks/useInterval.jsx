// Step 1: useInterval accepts 2 params (callback, delay) — callback is the function to run, delay is the interval duration in ms
// Step 2: Create a callbackRef using useRef to store the latest callback — same pattern as useTimeout to avoid stale closures
// Step 3: Assign callbackRef.current to always hold the latest callback on every render
// Step 4: Inside useEffect, if delay is null return early — null delay is the convention to pause/stop the interval
// Step 5: Set an interval that calls callbackRef.current on every tick, store it in intervalId
// Step 6: Cleanup clears the interval on unmount or when delay changes
// Step 7: Dependency array has only delay — interval rebuilds only when delay changes, but always calls latest callback via ref

import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (delay === null) return;

    const intervalId = setInterval(() => callbackRef.current(), delay);

    return () => clearInterval(intervalId);
  }, [delay]);
};

export default useInterval;
