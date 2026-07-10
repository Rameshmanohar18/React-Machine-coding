// Step 1: usePageVisits accepts 1 param (key) — a unique string to identify what we are tracking (e.g. 'home_page', 'product_page')
// Step 2: Initialize visitCount state by reading directly from localStorage — JSON.parse the stored value, fallback to 0 if nothing found
// Step 3: Inside useEffect with empty deps [] — increments visitCount by 1 and syncs the new value to localStorage using JSON.stringify, runs only once on mount
// Step 4: Return visitCount so consumer can display or use the count

import { useState, useEffect } from 'react';

const usePageVisits = (key = 'page_visits') => {
  const [visitCount, setVisitCount] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : 0;
  });

  useEffect(() => {
    setVisitCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem(key, JSON.stringify(newCount));
      return newCount;
    });
  }, []);

  return visitCount;
};

export default usePageVisits;
