// Step 1: Define initialUser (starting value) and defaultUser (fallback when state is null or undefined)
// Step 2: Destructure [user, setUser] from useDefault — passing defaultUser first, initialUser second
// Step 3: Input onChange calls setUser with a new user object — as long as value is not null, real state is used
// Step 4: Reset button sets state to null — hook automatically falls back to defaultUser at that point

import useDefault from './customHooks/useDefault';

export default function App() {
  const initialUser = { name: 'Marshall' };
  const defaultUser = { name: 'Mathers' };
  const [user, setUser] = useDefault(defaultUser, initialUser);

  return (
    <div>
      <div>User: {user.name}</div>
      <input onChange={(e) => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>Reset</button>
    </div>
  );
}
