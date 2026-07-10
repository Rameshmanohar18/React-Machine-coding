// Step 1: usePrevious accepts 1 param (value)
// Step 2: Create a ref (no initial value) — this ref will secretly store the previous value
// Step 3: useEffect runs AFTER every render when value changes, and inside it assigns ref.current to the latest value
// Step 4: Return ref.current — since useEffect runs after render, ref.current still holds the OLD value during current render, which is exactly the previous value we want

import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
