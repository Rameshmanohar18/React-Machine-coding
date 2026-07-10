// Step 1: Pass a unique key 'home_page' into usePageVisits — visits are stored under this key in localStorage
// Step 2: visitCount increments by 1 every time this component mounts
// Step 3: Count persists across page refreshes since it's backed by localStorage
// Step 4: Reset button clears localStorage and reloads the page to demonstrate counter starting from 0 again

import usePageVisits from './customHooks/usePageVisits';

export default function App() {
  const visitCount = usePageVisits('home_page');

  return (
    <div>
      <p>
        You have visited this page {visitCount}{' '}
        {visitCount === 1 ? 'time' : 'times'}
      </p>
      <button
        onClick={() => {
          localStorage.removeItem('home_page');
          window.location.reload();
        }}
      >
        Reset Visit Count
      </button>
    </div>
  );
}
