// Step 1: useIdle with 3000ms — user is considered idle after 3 seconds of no interaction
// Step 2: Conditionally render Active or Idle status based on isIdle boolean
// Step 3: Move mouse, press any key, scroll or touch to reset the idle timer back to active
// Step 4: Switch to another tab and come back — user is immediately marked as active again via visibilitychange

import useIdle from './customHooks/useIdle';

export default function App() {
  const isIdle = useIdle(3000);

  return (
    <div>
      <p>Status: {isIdle ? 'Idle' : 'Active'}</p>
      <p>Idle after: 3 seconds of no interaction</p>
      <p>Move mouse, press a key or scroll to reset the timer</p>
    </div>
  );
}
