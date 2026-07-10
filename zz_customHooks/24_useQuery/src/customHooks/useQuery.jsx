// Step 1: useQuery accepts 2 params (queryFn, deps) — queryFn is an async function that returns data, deps is the dependency array that controls when to re-fetch
// Step 2: Create a state object { data, loading, error } to track all three states of the async operation
// Step 3: Create an isMountedRef to track if the component is still mounted — prevents state updates on unmounted components (memory leak prevention)
// Step 4: Inside useEffect, define an async fetchData function — set loading true and clear previous error before every fetch
// Step 5: Inside try block, call queryFn() and await the result — if component is still mounted, set data and loading false
// Step 6: Inside catch block, if component is still mounted set error and loading false
// Step 7: Call fetchData() immediately inside the effect to trigger the fetch
// Step 8: Cleanup sets isMountedRef.current to false so any in-flight response is ignored after unmount
// Step 9: Spread deps into the dependency array — re-fetches automatically whenever deps change, same as useEffect behavior
// Step 10: Return the state object { data, loading, error } so consumer can handle all three states

import { useState, useEffect, useRef } from 'react';

const useQuery = (queryFn, deps = []) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await queryFn();
        if (isMountedRef.current) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMountedRef.current) {
          setState({ data: null, loading: false, error });
        }
      }
    };

    fetchData();

    return () => {
      isMountedRef.current = false;
    };
  }, deps);

  return state;
};

export default useQuery;
