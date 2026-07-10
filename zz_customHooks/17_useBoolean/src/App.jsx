// Step 1: Destructure { value, setTrue, setFalse, toggle } from useBoolean hook
// Step 2: Conditionally render 'enabled' or 'disabled' based on value
// Step 3: Each button uses its own memoized handler — these function references never change across re-renders
// Step 4: Since setTrue, setFalse, toggle are stable references, passing them to child components or React.memo components will never cause unnecessary re-renders

import useBoolean from './customHooks/useBoolean';

export default function App() {
  const { value, setTrue, setFalse, toggle } = useBoolean();

  return (
    <div>
      <p>{value ? 'enabled' : 'disabled'}</p>
      <button onClick={setTrue}>Enable</button>
      <button onClick={setFalse}>Disable</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
