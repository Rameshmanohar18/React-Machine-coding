// Step 1: Destructure { count, start, stop, reset } from useCountdown — pass countStart as 10
// Step 2: Display live count value which decrements every second once started
// Step 3: Start button kicks off the countdown, Stop button pauses it, Reset button stops and restores count back to countStart
// Step 4: Countdown automatically stops at 0 without needing to click Stop manually

import useCountdown from './customHooks/useCountdown';

export default function App() {
  const { count, start, stop, reset } = useCountdown({
    countStart: 10,
    countStop: 0,
    intervalMs: 1000,
  });

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}