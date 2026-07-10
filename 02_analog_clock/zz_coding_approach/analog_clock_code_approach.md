
# 🕰️ Analog Clock Component Approach: Code + CSS Breakdown

---

## 🧩 Component Structure Overview

### 🗂️ App.jsx

- Simply **uses** the `AnalogClock.jsx` component.

### 🧱 AnalogClock.jsx

- **Uses** the reusable `ClockHand.jsx` component multiple times.
- Each usage passes two props:
  - `type`: "hour-hand", "min-hand", "second-hand"
  - `degrees`: computed via custom hook

```jsx
<ClockHand type="hour-hand" degrees={hourDegrees} />
```

### ⚙️ ClockHand.jsx

- Has a single `<div>` element:

```jsx
<div className={`hand ${type}`} style={{ transform: `rotate(${degrees}deg)` }} />
```

---

## 🧠 Core Logic Inside: `useClockHandDegrees.jsx` (Custom Hook)

### Step 1: Maintain a `time` state

```js
const [time, setTime] = useState(new Date());
```

### Step 2: `useEffect` for ticking every second

```js
useEffect(() => {
  const timerId = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timerId);
}, []);
```

### Step 3: Reusable function `getDegrees()`

```js
const getDegrees = (unit, maxUnits) => (unit / maxUnits) * 360 + 90;
```

> `+90` is used to align with default 0° rotation (pointing at 12 o’clock position).

### Step 4: Return computed values from the hook

```js
return {
  secondDegrees: getDegrees(time.getSeconds(), 60),
  minDegrees: getDegrees(time.getMinutes(), 60),
  hourDegrees: getDegrees(time.getHours(), 12),
};
```

---

## 🎨 Styling: CSS (Mandatory for Visual Output)

### Step 1: `AnalogClock.jsx` wrapper div

```html
<div className="clock">...</div>
```

```css
.clock {
  width: 400px; /* Sets the clock's width to 400 pixels, defining its overall size */
  height: 400px; /* Sets the clock's height to 400 pixels, ensuring a square shape for a circular clock */
  position: relative; /* Allows child elements (like clock face and hands) to be positioned relative to this container */
  border-radius: 50%; /* Makes the clock circular by rounding the corners fully */
  border: 8px solid black; /* Adds a thick black border around the clock to give it a defined edge */
}
```

### Step 2: `clock-face` wrapper div

```html
<div className="clock-face">...</div>
```

```css
.clock-face {
  position: relative; /* Enables absolute positioning of child elements (clock hands) relative to the clock face */
  width: 100%; /* Ensures the clock face takes up the full width of the parent (.clock) */
  height: 100%; /* Ensures the clock face takes up the full height of the parent (.clock) */
  transform: translateY(-3px); /* Slightly shifts the clock face upward to adjust for visual centering, compensating for border or padding effects */
}
```

### Step 3: ClockHand Styling via `ClockHand.jsx`

```jsx
<div className={`hand ${type}`} style={{ transform: `rotate(${degrees}deg)` }} />
```

#### Shared styles (`.hand`):
```css
.hand {
  background: black; /* Sets the hand color to black for visibility against the clock face */
  height: 6px; /* Defines the thickness of the clock hands for a consistent appearance */
  position: absolute; /* Positions hands absolutely within the clock face, allowing precise placement */
  top: 50%; /* Aligns the top of the hand to the vertical center of the clock face */
  transform-origin: 100%; /* Sets the rotation pivot point to the right end of the hand, enabling rotation from one end */
  transition: all 0.05s; /* Smooths hand movement with a 50ms transition for all transform changes */
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1); /* Uses a custom easing curve to create a bouncy, natural motion for hand transitions */
}
```

#### Individual Hand Types:
```css
.hour-hand {
  width: 30%; /* Sets the hour hand length to 30% of the clock's diameter, making it shorter for distinction */
  right: 50%; /* Positions the right end of the hour hand at the clock's horizontal center, aligning it with the pivot point */
}

.min-hand {
  width: 40%; /* Sets the minute hand length to 40% of the clock's diameter, longer than the hour hand for clarity */
  right: 50%; /* Positions the right end of the minute hand at the clock's horizontal center, aligning it with the pivot point */
}

.second-hand {
  width: 45%; /* Sets the second hand length to 45% of the clock's diameter, the longest for visual hierarchy */
  right: 50%; /* Positions the right end of the second hand at the clock's horizontal center, aligning it with the pivot point */
}
```

### 🧠 Important:
- **Rotation** is applied inline through:
```jsx
style={{ transform: `rotate(${degrees}deg)` }}
```

---

## 🚀 Summary

| Component                 | Purpose                                   |
| :------------------------ | :---------------------------------------- |
| `App.jsx`                 | Mounts `AnalogClock`                      |
| `AnalogClock.jsx`         | Displays the circular clock and its hands |
| `ClockHand.jsx`           | Reusable visual component for each hand   |
| `useClockHandDegrees.jsx` | Calculates rotation based on time         |

---
