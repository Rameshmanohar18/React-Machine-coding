// Step 1: useMediaQuery accepts 1 param (query) — a CSS media query string like '(max-width: 768px)'
// Step 2: Create a matches state initialized by immediately evaluating window.matchMedia(query).matches — captures correct value on first render
// Step 3: Inside useEffect, create a mediaQueryList object using window.matchMedia(query)
// Step 4: Define handleChange — updates matches state with the latest mediaQueryList.matches value on every query change
// Step 5: Attach change listener to mediaQueryList using addEventListener, cleanup removes it on unmount
// Step 6: Dependency array has query — listener rebuilds whenever the query string itself changes
// Step 7: Return matches boolean so consumer can use it directly in JSX conditionals

import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
