import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = () => {
  const [light, setLight] = useState('red');
  const [isPaused, setIsPaused] = useState(false);

  const onReset = () => {
    setLight('red');
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      if (light === 'red') {
        setLight('yellow');
      } else if (light === 'yellow') {
        setLight('green');
      } else if (light === 'green') {
        setLight('red');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [light, isPaused]);

  const togglePause = () => setIsPaused((prev) => !prev);

  return (
    <div className='traffic-light-container'>
      <div className='traffic-light'>
        <div className={`light red ${light === 'red' ? 'on' : ''}`}></div>
        <div className={`light yellow ${light === 'yellow' ? 'on' : ''}`}></div>
        <div className={`light green ${light === 'green' ? 'on' : ''}`}></div>
      </div>
      <button onClick={togglePause} className='toggle-button'>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={onReset} className='reset-button'>
        Reset
      </button>
    </div>
  );
};

export default TrafficLight;
