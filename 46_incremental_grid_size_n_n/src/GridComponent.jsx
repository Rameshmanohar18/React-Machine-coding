import React, { useState, useCallback, useMemo } from 'react';
import Cell from './Cell';

const GridComponent = ({ n }) => {
  // Initialize grid with null values (empty cells)
  const [grid, setGrid] = useState(() => Array(n * n).fill(null));

  // Memoize max value calculation to avoid recalculating on every render
  const maxValue = useMemo(() => {
    const filledCells = grid.filter((cell) => cell !== null);
    // Math.max(...array) picks the max value and return in a number type
    return filledCells.length === 0 ? 0 : Math.max(...filledCells);
  }, [grid]);

  // Memoized click handler to prevent re-creating function on every render
  const handleCellClick = useCallback(
    (index) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        const currentValue = newGrid[index];

        if (currentValue === null) {
          // Empty cell: fill with max + 1
          newGrid[index] = maxValue + 1;
        } else {
          // Non-empty cell: update with current max
          newGrid[index] = maxValue;
        }

        return newGrid;
      });
    },
    [maxValue]
  );

  // Reset grid to initial state
  const handleReset = useCallback(() => {
    setGrid(Array(n * n).fill(null));
  }, [n]);

  return (
    <div className='grid-container'>
      <div className='grid-header'>
        <h2>N×N Grid (N = {n})</h2>
        <div className='info'>
          <span>
            Max Value: <strong>{maxValue}</strong>
          </span>
          <span>
            Filled Cells:{' '}
            <strong>{grid.filter((v) => v !== null).length}</strong>
          </span>
          <button onClick={handleReset} className='reset-btn'>
            Reset
          </button>
        </div>
      </div>

      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gridTemplateRows: `repeat(${n}, 1fr)`,
        }}
      >
        {grid.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
