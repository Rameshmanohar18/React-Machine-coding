import React, { useState } from 'react';
import GridComponent from './GridComponent';

const App = () => {
  const [gridSize, setGridSize] = useState(3);
  const [inputValue, setInputValue] = useState('3');

  const handleSizeChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const size = parseInt(inputValue);
    if (size >= 1 && size <= 10) {
      setGridSize(size);
    }
  };

  return (
    <div className='app'>
      <h1>Incremental Grid Challenge</h1>

      <form onSubmit={handleSubmit} className='input-form'>
        <label>
          Grid Size (N):
          <input
            type='number'
            min='1'
            max='10'
            value={inputValue}
            onChange={handleSizeChange}
            className='size-input'
          />
        </label>
        <button type='submit' className='submit-btn'>
          Generate Grid
        </button>
      </form>

      <GridComponent key={gridSize} n={gridSize} />
    </div>
  );
};

export default App;
