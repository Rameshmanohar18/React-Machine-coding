// Step 1: useBoolean accepts 1 optional param (initialValue) defaulting to false
// Step 2: Create a value state initialized with initialValue
// Step 3: Define setTrue using useCallback — sets value to true, memoized with [] so same function instance is returned across every re-render
// Step 4: Define setFalse using useCallback — sets value to false, same memoization approach
// Step 5: Define toggle using useCallback — uses functional update form (prev => !prev) so it never needs value in its deps array, same memoization approach
// Step 6: Return { value, setTrue, setFalse, toggle } so consumer gets the boolean state and all 3 stable memoized handlers

import { useState, useCallback } from 'react';

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, setTrue, setFalse, toggle };
};

export default useBoolean;
