import React from 'react';

const Stats = ({ timeRemaining, wpm, accuracy }) => {
  return (
    <div className='stats'>
      <div className='stat-item'>
        <span className='stat-label'>Time Left</span>
        <span className='stat-value'>{timeRemaining}s</span>
      </div>
      <div className='stat-item'>
        <span className='stat-label'>WPM</span>
        <span className='stat-value'>{wpm}</span>
      </div>
      <div className='stat-item'>
        <span className='stat-label'>Accuracy</span>
        <span className='stat-value'>{accuracy}%</span>
      </div>
    </div>
  );
};

export default Stats;
