import { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = () => {
  // Example: horizontalPosition = 'left' aligns toasts to the left side of the screen
  // const [horizontalPosition, setHorizontalPosition] = useState('left');

  // Example: verticalPosition = 'top' places toasts at the top of the screen
  // const [verticalPosition, setVerticalPosition] = useState('top');

  // State to store the type of toast ('success', 'error', 'warning', 'info')
  // Example: toastType = 'success' applies green styling to indicate a successful action
  const [toastType, setToastType] = useState('success');

  // State to store the message displayed in the toast
  // Example: message = 'Operation completed!' shows this text in the toast
  const [message, setMessage] = useState('This is a toast message!');

  // State to store the duration (in seconds) a toast remains visible
  // Example: duration = 5 means toasts disappear after 5 seconds
  const [duration, setDuration] = useState(5);

  // State to store the list of active toasts
  // Example: toasts = [{message: 'Success!', toastType: 'success', time: 1634567890123}, ...]
  const [toasts, setToasts] = useState([]);

  // useEffect to automatically remove toasts after their duration expires
  useEffect(() => {
    // Create an interval that runs every 1000 milliseconds (1 second)
    // Example: Every second, it checks if any toasts are too old to keep
    const timer = setInterval(() => {
      // Update the toasts array by keeping only those that haven’t exceeded their duration
      // Example: If a toast was created at 1741629960000 and it’s now 1741629966000, it’s 6 seconds old
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => {
          // Calculate the toast’s age in milliseconds (current time - creation time)
          // Example: 1741629966000 - 1741629960000 = 6000ms (6 seconds)
          const toastAge = Date.now() - toast.time;

          // Keep the toast if its age is less than duration (in milliseconds)
          // Example: If duration=5 (5000ms), 6000 < 5000 is false, so the toast is removed
          //          If toastAge=4000, 4000 < 5000 is true, so the toast stays
          return toastAge < duration * 1000;
        })
      );
    }, 1000);

    // Cleanup function to stop the interval when the component unmounts or duration changes
    // Example: Prevents the interval from running after the component is removed, avoiding memory leaks
    return () => clearInterval(timer);
  }, [duration]); // Re-run the effect if duration changes
  // Example: If duration changes from 5 to 7 seconds, a new interval is set with updated timing

  // Function to add a new toast to the list
  const showToast = () => {
    // Add a new toast object to the toasts array with current settings and timestamp
    // Example: Adds {message: 'This is a toast', toastType: 'success', horizontalPosition: 'left', verticalPosition: 'top', time: 1634567890123}
    setToasts([
      ...toasts,
      {
        message,
        toastType,
        // horizontalPosition,
        // verticalPosition,
        time: Date.now(), // Current timestamp in milliseconds
      },
    ]);
  };

  // Function to remove a specific toast by its timestamp
  // Parameter time is the timestamp of the toast to remove
  const removeToast = (time) => {
    // Filter out the toast with the matching timestamp
    // Example: If time=1634567890123, removes the toast with that exact time
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.time !== time)
    );
  };

  return (
    // Main container for the toast notification system, centered on the page
    <div className='container text-center'>
      <div className='flex'>
        {/* Dropdown to select horizontal position (left or right) */}
        {/* <select
          value={horizontalPosition}
          onChange={(e) => setHorizontalPosition(e.target.value)}
        >
          <option value='left'>Left</option>
          <option value='right'>Right</option>
        </select> */}

        {/* Dropdown to select vertical position (top or bottom) */}
        {/* <select
          value={verticalPosition}
          onChange={(e) => setVerticalPosition(e.target.value)}
        >
          <option value='top'>Top</option>
          <option value='bottom'>Bottom</option>
        </select> */}

        {/* Dropdown to select toast type (success, error, warning, info) */}
        <select
          value={toastType}
          onChange={(e) => setToastType(e.target.value)}
        >
          <option value='success'>Success</option>
          <option value='error'>Error</option>
          <option value='warning'>Warning</option>
          <option value='info'>Info</option>
        </select>

        {/* Input field to set the toast message */}
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message'
        />

        {/* Slider to set toast duration (3 to 10 seconds) */}
        <label>
          Duration
          <input
            type='range'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min='3'
            max='10'
          />
        </label>

        {/* Button to trigger a new toast with current settings */}
        <button type='button' onClick={showToast}>
          Show Toast
        </button>
      </div>

      {/* Example: className='toast-container tc-left-top' positions toasts in the top-left corner */}
      <div
        // className={`toast-container tc-${horizontalPosition}-${verticalPosition}`}
        className={`toast-container`}
      >
        {toasts.map((toast, index) => (
          // Each toast is a div with a unique key for React’s reconciliation
          // Example: key=0 for the first toast, key=1 for the second, etc.
          <div key={index} className={`toast ${toast.toastType}`}>
            {/* Display the toast’s message */}
            {/* Example: Shows 'This is a toast message!' if that’s the toast’s message */}
            <span className='toast-message'>{toast.message}</span>
            {/* Button to manually remove the toast */}
            {/* Example: Clicking '✕' removes the toast with toast.time=1634567890123 */}
            <button className='remove' onClick={() => removeToast(toast.time)}>
              &#x2715; {/* Unicode for '✕' (cross symbol) */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastNotification;
