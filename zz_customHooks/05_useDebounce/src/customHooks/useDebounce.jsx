// Step 1: useDebounce accepts 2 params (value, delay)
// Step 2: Create a debouncedValue useState initialized with the incoming value
// Step 3: Inside useEffect, set a setTimeout that updates debouncedValue to the latest value after the delay
// Step 4: Cleanup clears the previous timeout on every keystroke — this is the core debounce logic (timer resets on every change)
// Step 5: Return debouncedValue — it only updates when the user stops typing for the given delay duration

import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;