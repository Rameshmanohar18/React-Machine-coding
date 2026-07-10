import React from 'react';

interface ClockHandProps {
  type: string;
  degrees: number;
}

const ClockHand: React.FC<ClockHandProps> = ({ type, degrees }) => {
  return (
    <div
      className={`hand ${type}`}
      style={{ transform: `rotate(${degrees}deg)` }}
    ></div>
  );
};

export default ClockHand;
