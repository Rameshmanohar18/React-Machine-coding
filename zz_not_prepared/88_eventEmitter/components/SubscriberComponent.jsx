// SubscriberComponent.jsx
import React, { useState, useCallback } from 'react';
import useEvent from '../src/customHooks/useEvent';

function SubscriberComponent() {
  const [messages, setMessages] = useState([]);

  // ✅ useCallback so the callback reference is stable
  const handleMessage = useCallback((payload) => {
    setMessages((prev) => [...prev, payload]);
  }, []);

  // ✅ Req 3b: listens and updates UI
  useEvent('user:message', handleMessage);

  return (
    <div style={{ padding: 16, border: '1px solid green' }}>
      <h3>📥 Subscriber</h3>
      {messages.length === 0 ? (
        <p>No messages yet...</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>
              <strong>{msg.text}</strong>
              <small> — {msg.timestamp}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubscriberComponent;
