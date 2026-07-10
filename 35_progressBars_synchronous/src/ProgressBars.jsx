import { useState, useEffect } from 'react';

export default function ProgressBars() {
  // State to store array of progress bars with their progress values
  const [bars, setBars] = useState([]);

  // Function to add a new progress bar
  const addBar = () => {
    const newBar = {
      id: Date.now(), // Unique identifier using timestamp
      progress: 0, // Start with 0% progress
    };
    setBars((prev) => [...prev, newBar]);
  };

  // Effect to handle progress animation
  useEffect(() => {
    // Set up interval to update progress every 20ms
    const interval = setInterval(() => {
      setBars((prev) => {
        if (prev.length === 0) return prev; // No bars to update

        const newBars = [...prev];

        // Find the first bar that hasn't completed (progress < 100)
        const activeBarIndex = newBars.findIndex((bar) => bar.progress < 100);

        // If it finds a bar with progress < 100% → returns index (0, 1, 2, etc.)

        // If ALL bars have progress = 100% → returns -1

        if (activeBarIndex !== -1) {
          // Increment progress by 1% (100 steps total for 2000ms)
          newBars[activeBarIndex].progress = Math.min(
            100,
            newBars[activeBarIndex].progress + 0.25
          );
        }

        return newBars;
      });
    }, 50); // Update every 50ms

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array - timer runs continuously

  return (
    <div className='app-container'>
      {/* Add button to create new progress bars */}
      <button className='add-button' onClick={addBar}>
        Add
      </button>

      {/* Render all progress bars */}
      {bars.map((bar) => (
        <div key={bar.id} className='progress-bar-wrapper'>
          {/* Progress bar container (gray background) */}
          <div className='progress-bar-container'>
            {/* Progress bar fill (green) - only width needs to be dynamic */}
            <div
              className='progress-bar-fill'
              style={{ width: `${bar.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
