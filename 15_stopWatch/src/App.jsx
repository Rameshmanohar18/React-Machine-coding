import { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  // useRef to store the ID of the requestAnimationFrame to avoid unnecessary re-renders
  let animationFrameRef = useRef(0);

  // useRef to store the last time the timer was updated to calculate elapsed time
  const lastTimer = useRef(Date.now());

  // State for the timer display, initialized to "00:00:00"
  const [timerString, updateTime] = useState(['00', '00', '00']);

  // State to keep track of whether the timer is running
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // The main function to update the timer
  const timerFn = () => {
    // Calculate elapsed time since the last reset
    const milliSecondElapsed = Date.now() - lastTimer.current;
    const secondsElapsed = Math.floor(milliSecondElapsed / 1000);
    const minutesElapsed = Math.floor(secondsElapsed / 60);

    // Format milliseconds, seconds, and minutes
    const milliSeconds = (milliSecondElapsed % 1000)
      .toString()
      .padStart(3, '0'); //Ensures that the milliseconds part of the timer always displays three digits.
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0'); //Makes sure the seconds are always displayed as two digits.
    const minutes = minutesElapsed.toString().padStart(2, '0'); //Ensures that the minutes are always displayed with at least two digits.

    // Update the timer state with the new time
    updateTime([minutes, seconds, milliSeconds]);

    // Request the next animation frame to continue the timer
    animationFrameRef.current = requestAnimationFrame(timerFn);
  };

  // Start the timer
  const onStart = () => {
    setIsTimerRunning(true);
    // Begin the animation frame loop
    animationFrameRef.current = requestAnimationFrame(timerFn);
  };

  // Stop the timer
  const onStop = () => {
    setIsTimerRunning(false);
    // Cancel the animation frame loop
    cancelAnimationFrame(animationFrameRef.current);
  };

  // Reset the timer
  const onReset = () => {
    setIsTimerRunning(false);
    updateTime(['00', '00', '00']);
    // Cancel the animation frame and reset the last timer reference
    cancelAnimationFrame(animationFrameRef.current);
    lastTimer.current = Date.now();
  };

  // Cleanup function for when the component unmounts
  useEffect(() => {
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // JSX for rendering the stopwatch UI
  return (
    <div className={'watch-container'}>
      <div className={'watch'}>
        <div className={'watch-heading'}>Stopwatch</div>
        <div className={'watch-timer'}>
          {`${timerString[0]}:${timerString[1]}:${timerString[2]}`}
        </div>
        <div className={'watch-btn__container'}>
          <button
            disabled={isTimerRunning}
            onClick={onStart}
            className={'watch-btn'}
          >
            Start
          </button>
          <button
            onClick={onStop}
            disabled={!isTimerRunning}
            className={'watch-btn'}
          >
            Stop
          </button>
          <button onClick={onReset} className={'watch-btn'}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
