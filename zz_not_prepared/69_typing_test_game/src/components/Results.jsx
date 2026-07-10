import React from 'react';

const Results = ({
  wpm,
  accuracy,
  correctChars,
  totalChars,
  timeSpent,
  onRestart,
}) => {
  return (
    <div className='results'>
      <h2>Test Complete!</h2>
      <div className='results-grid'>
        <div className='result-item'>
          <span className='result-value'>{wpm}</span>
          <span className='result-label'>WPM</span>
        </div>
        <div className='result-item'>
          <span className='result-value'>{accuracy}%</span>
          <span className='result-label'>Accuracy</span>
        </div>
        <div className='result-item'>
          <span className='result-value'>
            {correctChars}/{totalChars}
          </span>
          <span className='result-label'>Characters</span>
        </div>
        <div className='result-item'>
          <span className='result-value'>{timeSpent}s</span>
          <span className='result-label'>Time Taken</span>
        </div>
      </div>
      <button className='restart-btn' onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
};

export default Results;
