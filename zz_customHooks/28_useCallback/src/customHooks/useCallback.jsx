// Step 1: useCallbackCustom accepts 2 params (callback, deps) — same signature as React's useCallback
// Step 2: Create a ref to store an object { callback, deps } — ref persists across renders without causing re-renders
// Step 3: isEqualDeps is a helper that does shallow equality check on two dep arrays using Object.is() — same helper as useMemoPolyfill
// Step 4: First render check — if ref.current is null, store { callback, deps } in ref.current immediately
// Step 5: Subsequent renders — if deps have changed (isEqualDeps returns false), update ref.current with the new { callback, deps }
// Step 6: If deps have NOT changed, ref.current keeps the old callback (same reference as before — this is the memoization)
// Step 7: Return ref.current.callback — same function instance when deps unchanged, new instance only when deps change

import { useRef } from 'react';

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

const useCallbackCustom = (callback, deps) => {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = { callback, deps };
  }

  if (!isEqualDeps(deps, ref.current.deps)) {
    ref.current = { callback, deps };
  }

  return ref.current.callback;
};

export default useCallbackCustom;
