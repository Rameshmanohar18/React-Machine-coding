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

        // Update up to 3 concurrent bars (instead of just 1)
        // CORE LOGIC STARTS
        let concurrentCount = 0;
        for (let i = 0; i < newBars.length && concurrentCount < 3; i++) {
          if (newBars[i].progress < 100) {
            newBars[i].progress = Math.min(100, newBars[i].progress + 1);
            concurrentCount++;
          }
        }

        // Update all eligible bars (those where the previous bar is at least 50% done)
        // CORE LOGIC STARTS
        // for (let i = 0; i < newBars.length; i++) {
        //   const canProgress = i === 0 || newBars[i - 1].progress >= 50;
        //   if (canProgress && newBars[i].progress < 100) {
        //     newBars[i].progress = Math.min(100, newBars[i].progress + 1);
        //   }
        // }

        return newBars;
      });
    }, 50); // Update every 50ms (5000ms / 100 steps = 50ms per step)

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
      <div className='progress-bars-container'>
        {bars.map((bar) => (
          <div key={bar.id} className='progress-bar-wrapper'>
            {/* Progress bar container (gray background) */}
            <div className='progress-bar-container'>
              {/* Progress bar fill (green) - only width needs to be dynamic */}
              <div
                className='progress-bar-fill'
                style={{ width: `${bar.progress}%` }}
              >
                <div className='progress-text'>{bar.progress}%</div>
              </div>
            </div>
            {/* Progress percentage text */}
          </div>
        ))}
      </div>
    </div>
  );
}
