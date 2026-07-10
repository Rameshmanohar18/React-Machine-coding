// Step 1: useCounter accepts 1 optional param (initialValue) defaulting to 0
// Step 2: Create a count state initialized with initialValue
// Step 3: Define increment using useCallback — uses functional update (prev => prev + 1) so no need for count in deps, memoized with []
// Step 4: Define decrement using useCallback — uses functional update (prev => prev - 1), memoized with []
// Step 5: Define reset using useCallback — sets count back to initialValue, memoized with [initialValue] since it depends on it
// Step 6: setCount is already a stable reference from useState — expose it directly so consumer can set any arbitrary value
// Step 7: Return { count, increment, decrement, reset, setCount } — all methods are stable references that never change across re-renders

import { useState, useCallback } from 'react';

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset, setCount };
};

export default useCounter;
