import React from 'react';
import './App.css';
import Board from './components/Board';
import DropZone from './components/DropZone';

function App() {
  return (
    <div className='App'>
      <h1 style={{ color: 'red' }}>
        Click on left and right arrows to move the ball
      </h1>
      <h1 style={{ color: 'blue' }}>Click on Space bar to drop the ball</h1>
      <DropZone />
      <Board />
    </div>
  );
}

export default App;
