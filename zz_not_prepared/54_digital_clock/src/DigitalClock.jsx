import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time to 12-hour format
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  // const ampm = hours >= 12 ? 'PM' : 'AM';

  // hours = hours % 12;
  // hours = hours ? hours : 12;

  // Simple string formatting
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className='clock-container'>
      <div className='clock'>
        <div className='time'>
          <span className='digits'>{formatNumber(hours)}</span>
          <span className='colon'>:</span>
          <span className='digits'>{formatNumber(minutes)}</span>
          <span className='colon'>:</span>
          <span className='digits'>{formatNumber(seconds)}</span>
        </div>
        {/* <div className='ampm'>{ampm}</div> */}
      </div>
    </div>
  );
};

export default DigitalClock;
