// Step 1: useEventListener accepts 4 params (eventName, handler, target, options) — target can be a ref, window, document, or media query list
// Step 2: Create a handlerRef using useRef to store the latest handler — same stale closure prevention pattern as useTimeout and useInterval
// Step 3: Assign handlerRef.current to always hold the latest handler on every render
// Step 4: Inside useEffect, resolve the actual DOM element — if target is a ref object read target.current, otherwise use target directly (window, document etc.)
// Step 5: If element doesn't exist or doesn't support addEventListener, return early
// Step 6: Wrap handlerRef.current in an eventListener function so we always call the latest handler
// Step 7: Attach the event listener to the resolved element with eventName and options (once, capture, passive etc.)
// Step 8: Cleanup removes the event listener on unmount or when dependencies change
// Step 9: Dependency array has eventName and target — listener rebuilds when either changes

import { useEffect, useRef } from 'react';

const useEventListener = (
  eventName,
  handler,
  target = window,
  options = {}
) => {
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  useEffect(() => {
    const element = target?.current ?? target;

    if (!element || !element.addEventListener) return;

    const eventListener = (event) => handlerRef.current(event);

    element.addEventListener(eventName, eventListener, options);

    return () => element.removeEventListener(eventName, eventListener, options);
  }, [eventName, target]);
};

export default useEventListener;
