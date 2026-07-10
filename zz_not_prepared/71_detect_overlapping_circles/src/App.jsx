import React, { useState } from 'react';

export default function App() {
  const [circles, setCircles] = useState([]);
  const RADIUS = 100;

  const handleClick = (event) => {
    // Don't create circle if clicking on button
    if (event.target.tagName === 'BUTTON') return;

    const x = event.clientX;
    const y = event.clientY;

    const newCircle = {
      id: Date.now(),
      x: x,
      y: y,
      radius: RADIUS,
      isOverlap: false,
    };

    // Check collision with existing circles
    const hasOverlap = circles.some((circle) =>
      checkCollision(newCircle, circle)
    );

    newCircle.isOverlap = hasOverlap;

    setCircles((prev) => [...prev, newCircle]);
  };

  const checkCollision = (circle1, circle2) => {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  };

  const resetCircles = () => {
    setCircles([]);
  };

  return (
    <div className='container' onClick={handleClick}>
      <button className='reset-btn' onClick={resetCircles}>
        Reset All
      </button>

      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`circle ${circle.isOverlap ? 'overlap' : ''}`}
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
          }}
        />
      ))}
    </div>
  );
}
