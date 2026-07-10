# Countdown Timer Component Logic

---

## App.jsx

- Import and use the `Timer.jsx` component.

```jsx
<Timer />
```

---

## Timer.jsx Breakdown

### Step 1: State Declarations

- `hour`, `minute`, `second`
- `isTimerActive` (boolean)
- `message` (string for validation warnings)

### Step 2: Define Handler Functions

- `startTimer()`
- `pauseTimer()`
- `resetTimer()`

### Step 3: `startTimer()` Logic

- If all time fields are 0 ➝ Set `message`
- Else ➝ Set `isTimerActive` to `true` and clear `message`

```js
if (hour === 0 && minute === 0 && second === 0) {
  setMessage('Please provide a valid time.');
} else {
  setIsTimerActive(true);
  setMessage('');
}
```

### Step 4: `pauseTimer()` Logic

```js
setIsTimerActive(false);
```

### Step 5: `resetTimer()` Logic

```js
setHour(0);
setMinute(0);
setSecond(0);
setIsTimerActive(false);
setMessage('');
```

### Step 6: `formatTime()` Utility

```js
const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);
```

---

## Core Countdown Logic (Inside `useEffect`)

### Dependencies

```js
useEffect(() => {
  let interval = null;

  if (isTimerActive && (hour > 0 || minute > 0 || second > 0)) {
    interval = setInterval(() => {
      if (second > 0) {
        setSecond((s) => s - 1);
      } else if (minute > 0) {
        setMinute((m) => m - 1);
        setSecond(59);
      } else if (hour > 0) {
        setHour((h) => h - 1);
        setMinute(59);
        setSecond(59);
      }
    }, 1000);
  } else if (!isTimerActive && interval !== null) {
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [isTimerActive, hour, minute, second]);
```

---

## JSX Layout Structure

### Layout: Two Divs

- Div 1: Inputs for hour, minute, second
- Div 2: Buttons (Start/Pause toggle and Reset)

### Input Handling

```jsx
<input
  type="number"
  value={hour}
  onChange={(e) => setHour(Math.max(0, Math.min(23, parseInt(e.target.value))))}
/>

<input
  type="number"
  value={minute}
  onChange={(e) => setMinute(Math.max(0, Math.min(59, parseInt(e.target.value))))}
/>

<input
  type="number"
  value={second}
  onChange={(e) => setSecond(Math.max(0, Math.min(59, parseInt(e.target.value))))}
/>
```

---

## Button Logic

- Toggle between Start and Pause buttons depending on `isTimerActive`

```jsx
{
  !isTimerActive ? (
    <button onClick={startTimer}>Start</button>
  ) : (
    <button onClick={pauseTimer}>Pause</button>
  );
}

<button onClick={resetTimer}>Reset</button>;
```

---

## Optional: Message Display

```jsx
{
  message && <div className='container__message'>{message}</div>;
}
```

---

## Summary

| Feature             | Logic                                        |
| ------------------- | -------------------------------------------- |
| State               | hour, minute, second, isTimerActive, message |
| startTimer          | Validate input, toggle timer                 |
| pauseTimer          | Stops interval                               |
| resetTimer          | Resets all values                            |
| useEffect           | Handles countdown logic                      |
| Input Restriction   | Math.max + Math.min guards                   |
| Format Display      | `formatTime()` helper                        |
| Conditional Buttons | Start ⇄ Pause toggle + Reset                 |
| Message UI          | Shown if no values are entered               |
