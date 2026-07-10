// Step 1: useTimeout accepts 2 params (callback, delay)
// Step 2: Core logic is to maintain callbackRef as a stable variable, we initialize useRef with the callback param
// Step 3: Assign callbackRef.current to always hold the latest callback param to avoid stale closures
// Step 4: useEffect triggers every time the delay param changes
// Step 5: Inside useEffect, assign setTimeout logic to timeoutId variable, and use it to clearTimeout in cleanup

import { useEffect, useRef } from 'react';

const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);

  // ✅ Stable timer, always latest callback
  callbackRef.current = callback;

  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(), delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);
};

export default useTimeout;
