import { useState, useEffect } from 'react';

export function useClockHandDegrees() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const getDegrees = (unit: number, maxUnits: number): number => {
    // degrees for rotation in a circular (360-degree) clock face.
    return (unit / maxUnits) * 360 + 90;
  };

  const secondsDegrees = getDegrees(time.getSeconds(), 60);
  const minsDegrees = getDegrees(time.getMinutes(), 60);
  const hourDegrees = getDegrees(time.getHours(), 12);

  return { secondsDegrees, minsDegrees, hourDegrees };
}
