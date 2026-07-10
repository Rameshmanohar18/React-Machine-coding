// Step 1: useClickOutside accepts 1 param (clickHandlerFunc) — a callback to run when user clicks outside
// Step 2: Create a ref to attach to the target DOM element we want to monitor
// Step 3: Inside useEffect, define handleClickOutside — it checks if the click event happened outside ref.current using contains()
// Step 4: If ref.current exists AND the clicked target is NOT inside ref.current, call clickHandlerFunc
// Step 5: Attach mousedown listener to the entire document — so every click anywhere on page is monitored
// Step 6: Cleanup removes the document event listener when component unmounts
// Step 7: Return ref so the consumer can attach it to the element they want to track outside clicks for

import { useEffect, useRef } from 'react';

const useClickOutside = (clickHandlerFunc) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        clickHandlerFunc();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutside;
