// Step 1: useEffectCustom accepts 2 params (effect, deps) — same signature as React's useEffect
// Step 2: isEqualDeps is the same shallow equality helper used in useMemoPolyfill and useCallbackPolyfill
// Step 3: Create prevDepsRef to store previous deps, cleanupRef to store previous cleanup function, isFirstRender ref to track first render
// Step 4: Use real useLayoutEffect with NO deps array — it runs after every render, but we control when to actually execute the effect ourselves
// Step 5: Inside useLayoutEffect, determine shouldRun — true if deps is undefined (no array), first render, or deps have changed
// Step 6: If shouldRun is true — call the previous cleanup if it exists, then run the new effect and store its returned cleanup in cleanupRef, update prevDepsRef with latest deps
// Step 7: Return cleanup from useLayoutEffect — fires before next render AND on unmount, calls cleanupRef.current if it exists

import { useRef, useLayoutEffect } from 'react';

function isEqualDeps(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

const useEffectCustom = (effect, deps) => {
  const prevDepsRef = useRef(null);
  const cleanupRef = useRef(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const shouldRun =
      deps === undefined || // no deps array — run every render
      isFirstRender.current || // first render — always run
      !isEqualDeps(deps, prevDepsRef.current); // deps changed — run again

    if (shouldRun) {
      if (!isFirstRender.current && cleanupRef.current) {
        cleanupRef.current(); // run previous cleanup before new effect
      }

      isFirstRender.current = false;
      const cleanup = effect();
      cleanupRef.current = typeof cleanup === 'function' ? cleanup : null;
      prevDepsRef.current = deps;
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current(); // run cleanup on unmount
        cleanupRef.current = null;
      }
    };
  }); // no deps — outer hook runs every render, inner logic controls the actual execution
};

export default useEffectCustom;
