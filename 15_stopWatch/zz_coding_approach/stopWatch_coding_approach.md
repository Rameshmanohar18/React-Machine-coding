# Stopwatch App (React + useRef + requestAnimationFrame)

---

## App.jsx

### Step 1: JSX Return Structure

```jsx
<div className="watch-container">
  <div className="watch">
    <h2>Stopwatch</h2>
    <div className="watch-timer">
      {`${timerString[0]}:${timerString[1]}:${timerString[2]}`}
    </div>
    <div className="watch-buttons">
      <button onClick={onStart} disabled={isTimerRunning}>Start</button>
      <button onClick={onStop} disabled={!isTimerRunning}>Stop</button>
      <button onClick={onReset}>Reset</button>
    </div>
  </div>
</div>
```

---

## Step 2: State and Refs

```js
const animationFrameRef = useRef(0);
const lastTimer = useRef(Date.now());
const [timerString, setTimerString] = useState(['00', '00', '000']);
const [isTimerRunning, setIsTimerRunning] = useState(false);
```

---

## Step 3: Button Handlers

```js
const onStart = () => {
  setIsTimerRunning(true);
  animationFrameRef.current = requestAnimationFrame(timerFn);
};

const onStop = () => {
  setIsTimerRunning(false);
  cancelAnimationFrame(animationFrameRef.current);
};

const onReset = () => {
  setIsTimerRunning(false);
  setTimerString(['00', '00', '000']);
  cancelAnimationFrame(animationFrameRef.current);
  lastTimer.current = Date.now();
};
```

---

## Step 4: Component Mount Cleanup

```js
useEffect(() => {
  return () => cancelAnimationFrame(animationFrameRef.current);
}, []);
```

---

## Step 5: timerFn Function (Core Logic)

```js
const timerFn = () => {
  const milliSecondsElapsed = Date.now() - lastTimer.current;
  const secondsElapsed = Math.floor(milliSecondsElapsed / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);

  const milliSeconds = (milliSecondsElapsed % 1000).toString().padStart(3, '0');
  const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
  const minutes = minutesElapsed.toString().padStart(2, '0');

  updateTime([minutes, seconds, milliSeconds]);
  animationFrameRef.current = requestAnimationFrame(timerFn);
};
```

---

## Step 6: updateTime Helper

```js
const updateTime = (timeArr) => {
  setTimerString(timeArr);
};
```

---

## Summary

| Hook                    | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `useRef`                | Tracks animation frame and last timer start time |
| `useState`              | Stores formatted time and running status         |
| `requestAnimationFrame` | Provides smooth time updates                     |

| Button | Behavior                               |
| ------ | -------------------------------------- |
| Start  | Begins animation and sets running true |
| Stop   | Pauses and cancels frame animation     |
| Reset  | Resets everything to initial state     |

