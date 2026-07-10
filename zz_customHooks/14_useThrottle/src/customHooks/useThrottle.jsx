// Step 1: useThrottle accepts 2 params (fn, delay) and returns a throttled version of fn
// Step 2: Create a lastCalled ref initialized to 0 — stores the timestamp of the last time fn was called
// Step 3: Return a useCallback wrapping the throttle logic — stable reference, won't re-create on every render
// Step 4: Inside the callback, get current timestamp and check if (Date.now() - lastCalled.current) >= delay
// Step 5: If enough time has passed — call fn(...args) and update lastCalled.current to now
// Step 6: If delay has NOT passed — skip the call entirely (fire-and-forget, no trailing call)

import { useRef, useCallback } from 'react';

function useThrottle(fn, delay = 300) {
  const lastCalled = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCalled.current >= delay) {
        lastCalled.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  );
}

export default useThrottle;
