// Step 1: Setup a count state initialized to 0
// Step 2: Pass a callback into useClickAnywhere — every click anywhere on the document increments count by 1
// Step 3: Functional update (prev => prev + 1) ensures we always get the latest count without stale closure issues
// Step 4: count renders live on screen — click anywhere to see it increment

import { useState } from 'react';
import useClickAnywhere from './customHooks/useClickAnywhere';

export default function App() {
  const [count, setCount] = useState(0);

  useClickAnywhere(() => {
    setCount((prev) => prev + 1);
  });

  return <p>Click count: {count}</p>;
}
