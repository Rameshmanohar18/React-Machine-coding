// Step 1: useMemoPolyfill accepts 2 params (factory, deps) — factory is the function to compute the value, deps is the dependency array
// Step 2: isEqualDeps is a helper that does shallow equality check on two arrays — compares each item using Object.is() (same logic React uses internally)
// Step 3: Create a ref initialized to null — it will store an object { deps, value } to persist across renders without triggering re-renders
// Step 4: First guard check — if deps is undefined (no dependency array passed), always call factory() and return fresh value every render (matches real useMemo behavior)
// Step 5: First render check — if ref.current is null, compute value by calling factory(), store { deps, value } in ref.current and return the value
// Step 6: Subsequent renders — if deps haven't changed (isEqualDeps returns true), return the cached ref.current.value without recomputing (this is the memoization)
// Step 7: If deps have changed — recompute by calling factory(), update ref.current with new { deps, value } and return the new value

import { useRef } from 'react';

// Simple shallow equality check (same as React's)
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

export function useMemoPolyfill(factory, deps) {
  const ref = useRef(null);

  // If deps is undefined (no dependency array passed), always recompute
  // This matches React's behavior: useMemo(fn) → recomputes every render
  if (deps === undefined) {
    return factory();
  }

  // From here on, assume deps is an array (or handle invalid cases if needed)
  // First render: initialize

  
  if (ref.current === null) {
    const value = factory();
    ref.current = {
      deps,
      value,
    };
    return value;
  }
  
  // Subsequent renders
  if (isEqualDeps(deps, ref.current.deps)) {
    return ref.current.value; // eslint-disable-line react-hooks/refs
  }

  // Deps changed: recompute
  const newValue = factory();
  ref.current = {
    deps,
    value: newValue,
  };

  return newValue;
}
