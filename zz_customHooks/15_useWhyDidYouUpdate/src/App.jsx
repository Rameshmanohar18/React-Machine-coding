// Step 1: UserCard is a child component that accepts (name, age, score) as props
// Step 2: Pass all props as an object into useWhyDidYouUpdate so it can compare them across renders
// Step 3: App maintains 3 states — name, age, score — each with its own button to trigger individual prop changes
// Step 4: On every button click only one prop changes — console will log exactly which prop changed, from what value, to what value

import { useState } from 'react';
import useWhyDidYouUpdate from './customHooks/useWhyDidYouUpdate';

const UserCard = ({ name, age, score }) => {
  useWhyDidYouUpdate('UserCard', { name, age, score });

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Score: {score}</p>
    </div>
  );
};

const App = () => {
  const [name, setName] = useState('Saiteja');
  const [age, setAge] = useState(25);
  const [score, setScore] = useState(100);

  return (
    <div>
      <UserCard name={name} age={age} score={score} />
      <button onClick={() => setName(name === 'Saiteja' ? 'Ravi' : 'Saiteja')}>
        Toggle Name
      </button>
      <button onClick={() => setAge(age + 1)}>Increment Age</button>
      <button onClick={() => setScore(score + 10)}>Increment Score</button>
    </div>
  );
};

export default App;
