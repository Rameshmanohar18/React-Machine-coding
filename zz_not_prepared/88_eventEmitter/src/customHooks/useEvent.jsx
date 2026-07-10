// useEvent.js
import { useEffect, useRef } from 'react';
import eventEmitter from '../eventEmitter';

function useEvent(eventName, callback) {
  // ✅ useRef keeps latest callback without re-subscribing on every render
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // stable wrapper always calls the latest callback
    const stableHandler = (payload) => callbackRef.current(payload);

    eventEmitter.on(eventName, stableHandler);

    return () => {
      // ✅ Req 4a: cleanup on unmount → no memory leaks
      eventEmitter.off(eventName, stableHandler);
    };
  }, [eventName]); // only re-subscribe if eventName changes
}

export default useEvent;
