// PublisherComponent.jsx
import React, { useState } from 'react';
import eventEmitter from '../src/eventEmitter';

function PublisherComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleEmit = () => {
    if (!inputValue.trim()) return;

    // ✅ Req 3a: emit event with payload
    eventEmitter.emit('user:message', {
      text: inputValue,
      timestamp: new Date().toISOString(),
    });

    setInputValue('');
  };

  return (
    <div style={{ padding: 16, border: '1px solid blue' }}>
      <h3>📤 Publisher</h3>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Type a message...'
      />
      <button onClick={handleEmit}>Emit Event</button>
    </div>
  );
}

export default PublisherComponent;
