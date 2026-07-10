// Step 1: useLocalStorage accepts 2 params (key, initialValue) and returns [storedValue, setValue] — works just like useState but persists to localStorage
// Step 2: Initialize storedValue state with a lazy initializer function — try to get existing value from localStorage by key and JSON.parse it, if nothing found return initialValue, if error return initialValue
// Step 3: Define setValue function — if the incoming value is a function (same API as useState), call it with storedValue to get the final value, otherwise use value directly
// Step 4: Inside setValue, update storedValue state AND sync to localStorage using JSON.stringify — both stay in sync on every update
// Step 5: Wrap both read and write in try/catch — localStorage can fail in private browsing or when storage is full
// Step 6: Return [storedValue, setValue] so the consumer can use it exactly like a regular useState hook

import { useState } from 'react';

// Custom Hook
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or, if null, return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  // that persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
