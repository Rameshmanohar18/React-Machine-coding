// Step 1: Destructure [name, setName] from useLocalStorage — passing 'name' as the key and '' as the initial value
// Step 2: Input is a controlled component — onChange calls setName which updates both state and localStorage simultaneously
// Step 3: name value persists across page refreshes since it's backed by localStorage

import { useLocalStorage } from './useLocalStorage';

function MyComponent() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default MyComponent;
