import React, { useState } from 'react';
import useAsyncStorage from './customHooks/useAsyncStorage';

const App = () => {
  // ── Demo 1: string
  const [username, setUsername, loadingName] = useAsyncStorage(
    'username',
    'Guest'
  );
  const [input, setInput] = useState('');

  // ── Demo 2: number (functional update)
  const [count, setCount, loadingCount] = useAsyncStorage('count', 0);

  // ── Demo 3: object (functional update)
  const [settings, setSettings, loadingSettings] = useAsyncStorage('settings', {
    theme: 'light',
  });

  return (
    <div>
      <h2>useAsyncStorage Demo</h2>
      <p>Refresh the page — all values persist via localStorage.</p>
      <hr />

      {/* Demo 1 — String */}
      <h3>String</h3>
      {loadingName ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>username: {username}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='type a name...'
          />
          <button
            onClick={() => {
              setUsername(input);
              setInput('');
            }}
          >
            Save
          </button>
          <button onClick={() => setUsername('Guest')}>Reset</button>
        </>
      )}

      <hr />

      {/* Demo 2 — Number with functional update */}
      <h3>Number (functional update)</h3>
      {loadingCount ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>count: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
          <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </>
      )}

      <hr />

      {/* Demo 3 — Object with functional update */}
      <h3>Object (functional update)</h3>
      {loadingSettings ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>theme: {settings.theme}</p>
          <button
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                theme: prev.theme === 'light' ? 'dark' : 'light',
              }))
            }
          >
            Toggle Theme
          </button>
        </>
      )}
    </div>
  );
};

export default App;
