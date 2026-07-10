import { useState } from 'react';
import './App.css';

const App = () => {
  // BOARD SIZE CONFIGURATION - Change this to scale the game!
  // Example: n=3 for 3x3, n=4 for 4x4, n=5 for 5x5, etc.
  const BOARD_SIZE = 3; // Try changing to 4 or 5!

  // Calculate total squares dynamically based on board size
  // Example: 3x3 board = 9 squares, 4x4 = 16 squares, 5x5 = 25 squares
  const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

  // Initialize state for n*n game board with null values
  // Example for n=3: squares = [null, null, null, null, null, null, null, null, null]
  // Example for n=4: squares = [null × 16]
  const [squares, setSquares] = useState(Array(TOTAL_SQUARES).fill(null));

  // Track whose turn it is (true for X, false for O)
  const [isXNext, setIsXNext] = useState(true);

  // SCALABLE WINNER CALCULATION - Works for any board size!
  const calculateWinner = () => {
    // Generate winning combinations dynamically based on board size
    let winningCombinations = [];

    // 1. ADD ALL ROWS as winning combinations
    // Example for n=3: rows are [0,1,2], [3,4,5], [6,7,8]
    // Example for n=4: rows are [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowCombination = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        // Formula: row * BOARD_SIZE + col gives us the index
        // Example: row=1, col=2, n=3 → 1*3+2 = index 5
        rowCombination.push(row * BOARD_SIZE + col);
      }
      winningCombinations.push(rowCombination);
    }

    // 2. ADD ALL COLUMNS as winning combinations
    // Example for n=3: columns are [0,3,6], [1,4,7], [2,5,8]
    // Example for n=4: columns are [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]
    for (let col = 0; col < BOARD_SIZE; col++) {
      const colCombination = [];
      for (let row = 0; row < BOARD_SIZE; row++) {
        // Same formula but iterating differently
        colCombination.push(row * BOARD_SIZE + col);
      }
      winningCombinations.push(colCombination);
    }

    // 3. ADD MAIN DIAGONAL (top-left to bottom-right)
    // Example for n=3: [0,4,8]
    // Example for n=4: [0,5,10,15]
    // Pattern: indices are 0, n+1, 2(n+1), 3(n+1), ...
    const mainDiagonal = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      // Formula: i * (BOARD_SIZE + 1) gives diagonal indices
      // Example for n=3: i=0→0, i=1→4, i=2→8
      mainDiagonal.push(i * (BOARD_SIZE + 1));
    }
    winningCombinations.push(mainDiagonal);

    // 4. ADD ANTI-DIAGONAL (top-right to bottom-left)
    // Example for n=3: [2,4,6]
    // Example for n=4: [3,6,9,12]
    // Pattern: starts at n-1, then adds n-1 each time
    const antiDiagonal = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      // Formula: (i + 1) * (BOARD_SIZE - 1) gives anti-diagonal
      // Example for n=3: i=0→2, i=1→4, i=2→6
      // Example for n=4: i=0→3, i=1→6, i=2→9, i=3→12
      antiDiagonal.push((i + 1) * (BOARD_SIZE - 1));
    }
    winningCombinations.push(antiDiagonal);

    // Check each winning combination for a winner
    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];

      // Check if all squares in this combination have the same non-null value
      // We need to check ALL n squares in the combination (not just 3)
      let firstValue = squares[combination[0]];

      // Skip if first square is empty
      if (!firstValue) continue;

      // Check if all squares in combination match the first square
      // Example: for [0,1,2,3] in 4x4, check if squares[0]==squares[1]==squares[2]==squares[3]
      let allMatch = true;
      for (let j = 1; j < combination.length; j++) {
        if (squares[combination[j]] !== firstValue) {
          allMatch = false;
          break;
        }
      }

      // If all match, we have a winner!
      if (allMatch) {
        return firstValue; // Return 'X' or 'O'
      }
    }

    // No winner found
    return null;
  };

  let winner = calculateWinner();

  // Set the game status message
  let status;
  if (winner) {
    status = `Winner is: ${winner} 🎁🎉💥`;
  } else {
    status = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }

  // Handle square clicks - works for any board size
  const handleClick = (i) => {
    // Prevent moves if game is won or square is already filled
    if (winner || squares[i]) return;

    // Create a copy and update the clicked square
    const newSquares = [...squares];
    newSquares[i] = isXNext ? 'X' : 'O';

    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  // Render a single square button
  const renderSquare = (i) => {
    return (
      <button className='square' onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  // Reset the game - scales automatically with BOARD_SIZE
  const resetGame = () => {
    setIsXNext(true);
    // Create array of TOTAL_SQUARES nulls
    // Example: n=4 creates Array(16).fill(null)
    setSquares(Array(TOTAL_SQUARES).fill(null));
  };

  // SCALABLE BOARD RENDERING - Dynamically creates n rows and n columns
  return (
    <div className='app_container'>
      <div className='status'>{status}</div>

      {/* Create n rows dynamically based on BOARD_SIZE */}
      {/* Example: for n=4, creates [0,1,2,3].map(...) */}
      {Array.from({ length: BOARD_SIZE }, (_, row) => (
        <div key={row} className='row'>
          {/* Create n columns per row */}
          {/* Example: for n=4, each row has 4 squares */}
          {Array.from({ length: BOARD_SIZE }, (_, col) =>
            // Calculate square index: row * n + col
            // Example for 4x4: row=2,col=3 → 2*4+3 = index 11
            renderSquare(row * BOARD_SIZE + col)
          )}
        </div>
      ))}

      <button className='resetGame' onClick={resetGame}>
        Reset Game ({BOARD_SIZE}x{BOARD_SIZE})
      </button>
    </div>
  );
};

export default App;

/* 
SCALING EXAMPLES:

For BOARD_SIZE = 3 (3x3):
- Total squares: 9
- Board indices:
  [0, 1, 2]
  [3, 4, 5]
  [6, 7, 8]
- Winning rows: [0,1,2], [3,4,5], [6,7,8]
- Winning cols: [0,3,6], [1,4,7], [2,5,8]
- Diagonals: [0,4,8], [2,4,6]

For BOARD_SIZE = 4 (4x4):
- Total squares: 16
- Board indices:
  [0,  1,  2,  3]
  [4,  5,  6,  7]
  [8,  9,  10, 11]
  [12, 13, 14, 15]
- Winning rows: [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]
- Winning cols: [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]
- Diagonals: [0,5,10,15], [3,6,9,12]

For BOARD_SIZE = 5 (5x5):
- Total squares: 25
- Board indices:
  [0,  1,  2,  3,  4]
  [5,  6,  7,  8,  9]
  [10, 11, 12, 13, 14]
  [15, 16, 17, 18, 19]
  [20, 21, 22, 23, 24]
- And so on...

TO CHANGE BOARD SIZE:
Just modify the BOARD_SIZE constant at the top!
Everything else scales automatically.
*/
