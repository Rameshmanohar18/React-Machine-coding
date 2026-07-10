// Step 1: Destructure { count, increment, decrement, reset, setCount } from useCounter — pass 10 as initialValue
// Step 2: increment and decrement buttons update count by 1 each click
// Step 3: Reset button restores count back to 10 (the initialValue)
// Step 4: Input uses setCount directly to jump to any arbitrary number
// Step 5: All handlers are memoized — passing them to React.memo child components will never cause unnecessary re-renders

import useCounter from './customHooks/useCounter';

export default function App() {
  const { count, increment, decrement, reset, setCount } = useCounter(10);

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <input
        type='number'
        onChange={(e) => setCount(Number(e.target.value))}
        placeholder='Set custom value'
      />
    </div>
  );
}
