# ProgressBar Component

---

## App.jsx

- Import and render the `ProgressBar.jsx` component

```jsx
<ProgressBar />
```

---

## ProgressBar.jsx Breakdown

### Step 1: useState Variables

```js
const [filled, setFilled] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [timerId, setTimerId] = useState(null);
```

---

## JSX Template Structure

### Step 2: Progress Bar Markup

```jsx
<div className='progressbar'>
  <div className='progressbar-filled' style={{ width: `${filled}%` }}>
    <span className='progressPercent'>{filled}%</span>
  </div>
</div>
```

### Step 3: Control Buttons

```jsx
<button onClick={() => setIsRunning(true)}>Start</button>
<button onClick={() => setIsRunning(false)}>Stop</button>
<button onClick={resetProgress}>Reset</button>
```

---

## Step 4: Core Logic with useEffect

```js
  useEffect(() => {
    // we are continuously checking if filled is 100 or not, if it is less than 100 then it keeps on running
    if (filled < 100 && isRunning) {
      const id = setTimeout(() => setFilled((prev) => prev + 25), 250);
      setTimerId(id);
      //  if filled is 100, just stop the +2 logic and simply make the state false
    } else if (filled === 100) {
      // Optionally handle completion here
      setIsRunning(false);
    }
    return () => clearTimeout(timeoutId);
  }, [filled, isRunning]);
```

---

## UI Styling (CSS)

### Step 1: `.progressbar` Container

```css
.progressbar {
  position: relative;
  width: 400px;
  height: 30px;
  background-color: lightgray;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
}
```

### Step 2: `.progressbar-filled`

```css
.progressbar-filled {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}
```

### Step 3: `.progressPercent` Styling

```css
.progressPercent {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: white;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
}
```

---

## Summary

| Feature          | Logic                                                       |
| ---------------- | ----------------------------------------------------------- |
| useState         | `filled`, `isRunning`, `timeoutId`                          |
| Progress Updates | Increment by 2% every 250ms using `setTimeout`              |
| Stop Condition   | Stop at 100%                                                |
| Reset            | Clears and resets all values                                |
| Styling          | Responsive bar with animated fill and overlaid percent text |
