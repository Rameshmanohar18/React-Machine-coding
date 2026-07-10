// Step 1: Simulate a fake API call using getDataFromServer — resolves after 1 second, throws error if param is 'error'
// Step 2: Setup a param state to control which data gets fetched
// Step 3: Pass an async queryFn into useQuery with [param] as deps — refetches automatically every time param changes
// Step 4: Destructure { data, loading, error } from useQuery and render each state conditionally
// Step 5: Buttons change param which triggers a fresh fetch cycle automatically via deps change

import { useState } from 'react';
import useQuery from './customHooks/useQuery';

const getDataFromServer = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (param === 'error') {
        reject(new Error('Something went wrong!'));
      } else {
        resolve({ data: `Fetched result for: ${param}` });
      }
    }, 1000);
  });
};

export default function App() {
  const [param, setParam] = useState('hello');

  const request = useQuery(async () => {
    const response = await getDataFromServer(param);
    return response.data;
  }, [param]);

  return (
    <div>
      {request.loading && <p>Loading...</p>}
      {request.error && <p>Error: {request.error.message}</p>}
      {request.data && <p>Data: {request.data}</p>}

      <button onClick={() => setParam('hello')}>Fetch Hello</button>
      <button onClick={() => setParam('world')}>Fetch World</button>
      <button onClick={() => setParam('error')}>Trigger Error</button>
    </div>
  );
}
