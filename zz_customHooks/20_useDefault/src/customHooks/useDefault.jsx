// Step 1: useDefault accepts 2 params (defaultValue, initialValue) and returns [value, setValue] — works just like useState but falls back to defaultValue when state is null or undefined
// Step 2: Create a state initialized with initialValue using useState
// Step 3: Derive the final value — if state is null or undefined return defaultValue, otherwise return state as is
// Step 4: Return [value, setState] — value is either the real state or the defaultValue fallback, setState is the raw setter directly from useState

import { useState } from 'react';

const useDefault = (defaultValue, initialValue) => {
  const [state, setState] = useState(initialValue);

  const value = state == null ? defaultValue : state;

  return [value, setState];
};

export default useDefault;
