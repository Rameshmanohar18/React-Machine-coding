// Step 1: Test case 1 — no deps array, logs on every single render
// Step 2: Test case 2 — empty deps [], logs only once on mount and cleans up on unmount
// Step 3: Test case 3 — [count] as deps, logs and cleans up every time count changes
// Step 4: Increment button changes count — triggers test case 3 effect, test case 2 stays silent, test case 1 always fires

import { useState } from 'react';
import useEffectCustom from './customHooks/useEffect';

export default function App() {
  const [count, setCount] = useState(0);

  // Test 1 — no deps, runs every render
  useEffectCustom(() => {
    console.log('No deps — runs every render');
    // return () => console.log('No deps — cleanup every render');
  });

  // Test 2 — empty deps, runs once on mount
  useEffectCustom(() => {
    console.log('Empty deps [] — runs once on mount');
    // return () => console.log('Empty deps [] — cleanup on unmount');
  }, []);

  // Test 3 — [count] deps, runs when count changes
  useEffectCustom(() => {
    console.log(`[count] deps — count changed to ${count}`);
    // return () => console.log(`[count] deps — cleanup for count ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count
      </button>
    </div>
  );
}
