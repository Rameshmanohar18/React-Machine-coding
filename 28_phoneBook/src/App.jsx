import React from 'react';
import './App.css'
import NamesList from './components/NamesList';

// The array of names to display
const namesArray = ['Ava', 'Anthony', 'Baddon', 'Baen', 'Caley', 'Caellum'];

// Usage of NamesList component
const App = () => {
  return (
    <div className='app-container'>
      <NamesList names={namesArray} />
    </div>
  );
};

export default App;
