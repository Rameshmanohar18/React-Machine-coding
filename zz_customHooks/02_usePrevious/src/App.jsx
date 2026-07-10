// Step 1: Setup a count state and pass it into usePrevious hook to track its previous value
// Step 2: usePrevious returns the previous value of count before the latest state update
// Step 3: useEffect logs both current and previous count every time count changes
// Step 4: Button increments count on every click which triggers the whole cycle

import { useEffect, useState } from 'react';
import usePrevious from './customHooks/usePrevious';

const App = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  useEffect(() => {
    console.log(
      `Current count is ${count}, Previous Count is ${previousCount || 0}`
    );
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default App;


// IN CASE IF YOU'RE CONFUSED

// First click logs Current: 1, Previous: 0
// This is the correct expected behavior of the hook — on first click, previous is 0 (the initial count value), current is 1.
// From second click onwards (2,1 → 3,2 → ...)
// Works perfectly — always one step behind, which is exactly what usePrevious is supposed to do.