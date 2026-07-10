// Step 1: useIdle accepts 1 optional param (ms) defaulting to 5000 — number of milliseconds of inactivity before user is considered idle
// Step 2: Create an isIdle state initialized to false — user is active on first load
// Step 3: Inside useEffect, create a resetTimer function — clears the previous timeout, sets isIdle to false (user is active), then sets a new timeout that sets isIdle to true after ms milliseconds
// Step 4: Define the events array — mousemove, mousedown, keydown, touchstart, touchmove, scroll — attach resetTimer as listener for all of them on the document
// Step 5: Define handleVisibilityChange — if document.visibilityState is 'visible' (user switched back to our tab), call resetTimer to mark user as active again
// Step 6: Attach visibilitychange listener to document for tab switching detection
// Step 7: Call resetTimer once immediately on mount to kick off the initial idle timer
// Step 8: Cleanup removes all event listeners and clears the timeout on unmount
// Step 9: Dependency array has ms — rebuilds if idle duration changes
// Step 10: Return isIdle boolean so consumer knows if user is idle or active

import { useState, useEffect, useRef } from 'react';

const DEFAULT_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'touchmove',
  'scroll',
];

const useIdle = (ms = 5000) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      setIsIdle(false);
      timeoutRef.current = setTimeout(() => setIsIdle(true), ms);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTimer();
      }
    };

    DEFAULT_EVENTS.forEach((event) =>
      document.addEventListener(event, resetTimer)
    );
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      DEFAULT_EVENTS.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [ms]);

  return isIdle;
};

export default useIdle;
