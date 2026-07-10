# Toast Notification System (React + useState + Configurable UI)

---

## App.jsx

* Import and render the `ToastNoty` component

```jsx
<ToastNoty />
```

---

## ToastNoty Component Breakdown

### Step 1: useState Declarations

```js
const [horizontalPosition, setHorizontalPosition] = useState('right');
const [verticalPosition, setVerticalPosition] = useState('top');
const [toastType, setToastType] = useState('success');
const [message, setMessage] = useState('This is a toast message');
const [duration, setDuration] = useState(5); // seconds
const [toasts, setToasts] = useState([]);
```

---

## Step 2: JSX Return Structure

```jsx
<div className="toast-noty-wrapper">
  <form onSubmit={handleShowToast}>
    <select onChange={(e) => setHorizontalPosition(e.target.value)} value={horizontalPosition}>
      <option value="left">Left</option>
      <option value="right">Right</option>
    </select>

    <select onChange={(e) => setVerticalPosition(e.target.value)} value={verticalPosition}>
      <option value="top">Top</option>
      <option value="bottom">Bottom</option>
    </select>

    <select onChange={(e) => setToastType(e.target.value)} value={toastType}>
      <option value="success">Success</option>
      <option value="error">Error</option>
      <option value="info">Info</option>
    </select>

    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Enter toast message"
    />

    <input
      type="range"
      min="2"
      max="10"
      value={duration}
      onChange={(e) => setDuration(Number(e.target.value))}
    />

    <button type="submit">Show Toast</button>
  </form>

  <div className={`toast-container tc-${horizontalPosition}-${verticalPosition}`}>
    {toasts.map((toast, index) => (
      <div key={index} className={`toast ${toast.toastType}`}>
        <span>{toast.message}</span>
        <button onClick={() => removeToast(index)}>×</button>
      </div>
    ))}
  </div>
</div>
```

---

## Supporting Functions

```js
const handleShowToast = (e) => {
  e.preventDefault();
  const newToast = {
    message,
    toastType
  };
  setToasts([...toasts, newToast]);
  setTimeout(() => removeToast(0), duration * 1000);
};

const removeToast = (index) => {
  setToasts(toasts.filter((_, i) => i !== index));
};
```

---

## Toast Positioning Classes

```css
.tc-left-top {
  top: 1rem;
  left: 1rem;
}

.tc-left-bottom {
  bottom: 1rem;
  left: 1rem;
}

.tc-right-top {
  top: 1rem;
  right: 1rem;
}

.tc-right-bottom {
  bottom: 1rem;
  right: 1rem;
}

.toast-container {
  position: fixed;
  z-index: 9999;
}

.toast {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast.success {
  border-left: 5px solid green;
}
.toast.error {
  border-left: 5px solid red;
}
.toast.info {
  border-left: 5px solid blue;
}
```

---

## Summary

| Feature             | Logic                                                 |
| ------------------- | ----------------------------------------------------- |
| Dynamic Positioning | Horizontal + Vertical positions selected via dropdown |
| Toast Customization | Message, type, and duration are user-configurable     |
| Auto-dismiss        | Toast disappears after set timeout                    |
| Manual Dismiss      | Button `×` removes toast instantly                    |

* Modular and flexible toast system
* Great for alerts, confirmations, and feedback messages
