import React, { useState, useEffect } from 'react';

const LightGrid = () => {
  // State to track which cells are active (true = green, false = white)
  // We use a 3x3 grid but skip the center cell [1,1]
  const [activeCells, setActiveCells] = useState({});

  // Track the order in which cells were activated for reverse deactivation
  const [activationOrder, setActivationOrder] = useState([]);

  // Prevent clicks during deactivation animation
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Handle cell click - activate the cell and track order
  const handleCellClick = (cellId) => {
    // Don't allow clicks during deactivation animation
    if (isDeactivating) return;

    // Don't allow clicking already active cells
    if (activeCells[cellId]) return;

    // Activate the cell and add to activation order
    setActiveCells((prev) => ({ ...prev, [cellId]: true }));
    setActivationOrder((prev) => [...prev, cellId]);
  };

  // Convert cell ID to index number for display (0-7)
  // Mapping: "0-0"→0, "0-1"→1, "0-2"→2, "1-0"→3, "1-2"→4, "2-0"→5, "2-1"→6, "2-2"→7
  const cellIdToIndex = (cellId) => {
    const [row, col] = cellId.split('-').map(Number);
    if (row === 0) return col; // 0, 1, 2
    if (row === 1) return col === 0 ? 3 : 4; // 3, 4 (skipping center)
    if (row === 2) return col + 5; // 5, 6, 7
  };

  // IF YOU DON'T WANT THE EMPTY CELL IN THE MIDDLE
  // const cellIdToIndex = (cellId) => {
  //   const [row, col] = cellId.split('-').map(Number);
  //   return row * 3 + col; // 0,1,2 | 3,4,5 | 6,7,8
  // };

  // Check if all cells are activated and trigger deactivation
  useEffect(() => {
    const activeCount = Object.keys(activeCells).filter(
      (key) => activeCells[key]
    ).length;

    // If all 8 cells are active, start deactivation sequence
    if (activeCount === 8 && !isDeactivating) {
      setIsDeactivating(true);

      // Small delay to ensure the last cell shows as green before deactivation starts
      setTimeout(() => {
        // Deactivate cells in reverse order with 800ms delay between each (slower)
        const reverseOrder = [...activationOrder].reverse();

        reverseOrder.forEach((cellId, index) => {
          setTimeout(() => {
            // Deactivate the cell
            setActiveCells((prev) => ({ ...prev, [cellId]: false }));

            // Remove the deactivated cell from the order array (pop effect)
            setActivationOrder((prev) => prev.filter((id) => id !== cellId));

            // Reset everything when deactivation is complete
            if (index === reverseOrder.length - 1) {
              setTimeout(() => {
                setActivationOrder([]);
                setIsDeactivating(false);
              }, 100);
            }
          }, index * 1800); // 1800ms delay for slower deactivation
        });
      }, 200); // 200ms delay to show the last green cell
    }
  }, [activeCells, activationOrder, isDeactivating]);

  // Render individual cell with number display
  const renderCell = (cellId) => {
    const isActive = activeCells[cellId] || false;
    const cellIndex = cellIdToIndex(cellId);

    return (
      <div
        key={cellId}
        className={`cell ${isActive ? 'active' : ''}`}
        onClick={() => handleCellClick(cellId)}
      >
        {cellIndex}
      </div>
    );
  };

  // Create the 3x3 grid layout with center cell omitted
  const renderGrid = () => {
    const grid = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cellId = `${row}-${col}`;

        // Render empty space for center cell
        if (row === 1 && col === 1) {
          grid.push(<div key={cellId} className='cell-empty' />);
        } else {
          grid.push(renderCell(cellId)); // ----> Only write this, if you don't want an empty cell in the middle
        }
      }
    }

    return grid;
  };

  return (
    <div className='light-grid-container'>
      <h2>Light Grid Game</h2>
      <p>
        Click cells to turn them green. When all are lit, watch them turn off in
        reverse order!
      </p>
      <div className='grid'>{renderGrid()}</div>
      {isDeactivating && (
        <p className='status'>Deactivating in reverse order...</p>
      )}

      {/* Display the order of clicked cells - will pop during deactivation */}
      <div className='order-display'>
        <strong>
          order array:{' '}
          {activationOrder.map((cellId) => cellIdToIndex(cellId)).join(', ')}
        </strong>
        {activationOrder.length === 0 && !isDeactivating && (
          <span className='order-hint'> (click cells to build order)</span>
        )}
      </div>
    </div>
  );
};

export default LightGrid;
