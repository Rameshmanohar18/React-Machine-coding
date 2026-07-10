// Step 1: useClickAnywhere accepts 1 param (handler) — a callback to run on every click anywhere on the document
// Step 2: Create a handlerRef using useRef to store the latest handler — avoids stale closure without needing handler in effect deps
// Step 3: Assign handlerRef.current to always hold the latest handler (same pattern as useTimeout)
// Step 4: Inside useEffect, define handleClick — reads handlerRef.current and calls it on every document click
// Step 5: Attach click listener to document, cleanup removes it on unmount
// Step 6: Empty dependency array — listener is registered once on mount, but always calls the latest handler via ref

import { useEffect, useRef } from 'react';

const useClickAnywhere = (handler) => {
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  useEffect(() => {
    const handleClick = () => handlerRef.current();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

export default useClickAnywhere;
