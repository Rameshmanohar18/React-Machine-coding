import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  // Check if a given date has passed (expired)
  const isExpired = (endDate) => {
    return new Date() >= new Date(endDate);
  };

  // Calculate time difference in milliseconds
  const getTimeDiff = (endDate) => {
    return new Date(endDate) - new Date();
  };

  // Convert milliseconds to time units (days, hours, minutes, seconds)
  const convertToTimeUnits = (milliseconds) => {
    return {
      days: Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((milliseconds / (1000 * 60 * 60)) % 24),
      mins: Math.floor((milliseconds / (1000 * 60)) % 60),
      secs: Math.floor((milliseconds / 1000) % 60),
    };
  };

  const getTimeLeft = (endDate) => {
    // Step 1: Calculate time difference in milliseconds
    const diff = getTimeDiff(endDate);

    // Step 2: Check if already expired (diff <= 0 means time has passed)
    if (diff <= 0) return 'Expired';

    // Step 3: Convert milliseconds to readable time units
    const { days, hours, mins, secs } = convertToTimeUnits(diff);

    // Step 4: Return appropriate format based on largest time unit
    // Priority: days > hours > minutes > seconds
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // ============================================
  // AUTO-EXPIRY EFFECT
  // ============================================

  useEffect(() => {
    // Create interval that runs every 1 second (1000ms)
    const timer = setInterval(() => {
      // Update todos state immutably
      setTodos((prev) =>
        prev.map((todo) => {
          // Only check todos that have dates and aren't already completed
          if (todo.date && !todo.completed) {
            // Reuse isExpired utility function
            if (isExpired(todo.date)) {
              // Mark as completed by returning new object with updated property
              return { ...todo, completed: true };
            }
          }
          // Return unchanged todo if no updates needed
          return todo;
        })
      );
    }, 1000);

    // Cleanup: Clear interval when component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text.trim(),
        date: date || null,
        completed: false,
      },
    ]);

    setText('');
    setDate('');
  };

  return (
    <div className='app'>
      <h1>📝 Todo App</h1>

      <form onSubmit={addTodo}>
        <input
          type='text'
          placeholder='Add todo...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type='datetime-local'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button>Add</button>
      </form>

      <div className='todos'>
        {todos.map((todo) => (
          <div key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className='todo-text'>{todo.text}</div>

            {todo.date && (
              <div className='todo-meta'>
                <span className='date'>
                  🕒 {new Date(todo.date).toLocaleString()}
                </span>

                {/* Only show countdown for active (non-completed) todos */}
                {!todo.completed && (
                  <span className='countdown'>⏱️ {getTimeLeft(todo.date)}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
