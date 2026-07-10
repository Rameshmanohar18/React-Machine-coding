import { useState } from 'react';
import useTimeout from '../src/customHooks/useTimeout';
import './App.css'; // Import the CSS file

const App = () => {
  const [message, setMessage] = useState(
    'Waiting for timeout to be completed in 2 seconds...'
  );

  useTimeout(() => {
    setMessage('Timeout completed!');
  }, 2000);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
export default App;
