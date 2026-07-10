// Step 1: asyncStorage is a Promise-wrapped adapter over localStorage — getItem returns a resolved Promise with the raw string value, setItem returns a resolved Promise after writing, making it swappable with @react-native-async-storage without changing any hook logic

// Step 2: useAsyncStorage accepts 2 params (key, initialValue) — key is the localStorage identifier, initialValue is the fallback used when nothing is stored yet

// Step 3: Initialize storedValue state with initialValue as the immediate placeholder — this renders first while the async read is still in flight, preventing a blank/undefined flash

// Step 4: Initialize isLoading as true — flipped to false only after the storage read completes, lets consumers show a loading state during the async hydration window

// Step 5: Inside useEffect with [key] as dependency — defines and immediately calls an async load() function that reads from storage. If a value exists, JSON.parse it and set it as storedValue. If nothing exists, JSON.stringify the initialValue and seed it into storage so future reads always find something. Either way, set isLoading to false in the final step

// Step 6: setValue is wrapped in useCallback with [key, storedValue] as dependencies — checks if the incoming value is a function (functional update like prev => prev + 1), if so calls it with the current storedValue to resolve the next value, otherwise uses the value directly. Then updates React state immediately for a snappy UI and persists the JSON.stringified value to storage

// Step 7: Return [storedValue, setValue, isLoading] as a tuple — mirrors the useState [value, setter] API with isLoading as a third element so consumers can gate rendering until hydration is complete

import { useState, useEffect, useCallback } from 'react';

const asyncStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
};

function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const item = await asyncStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      } else {
        await asyncStorage.setItem(key, JSON.stringify(initialValue));
      }
      setIsLoading(false);
    };
    load();
  }, [key]);

  const setValue = useCallback(
    async (value) => {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await asyncStorage.setItem(key, JSON.stringify(valueToStore));
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoading];
}

export default useAsyncStorage;
