import { useState } from 'react';
import './App.css';

const App = () => {
  // Initialize state for the 9-square game board with null values
  // Example: squares = [null, null, null, null, null, null, null, null, null]
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Track whose turn it is (true for X, false for O)
  // Example: isXNext = true means X plays next
  const [isXNext, setIsXNext] = useState(true);

  // Function to check for a winner by examining all possible winning combinations
  const calculateWinner = () => {
    // Define all possible winning combinations (rows, columns, diagonals)
    // Example: [0, 1, 2] represents the first row (indices 0, 1, 2)
    let winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Top-left to bottom-right diagonal
      [2, 4, 6], // Top-right to bottom-left diagonal
    ];

    // Loop through each winning combination to check for a match
    for (let i = 0; i < winningCombinations.length; i++) {
      // Destructure the current combination into three indices (a, b, c)
      // Example: For [0, 1, 2], a=0, b=1, c=2
      const [a, b, c] = winningCombinations[i];

      // Check if all three positions have the same non-null value (X or O)
      // Example: If squares[0] = 'X', squares[1] = 'X', squares[2] = 'X', X wins
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // Return the winner ('X' or 'O')
        return squares[a];
      }
    }
    // Return null if no winner is found
    return null;
  };

  let winner = calculateWinner();

  // Set the game status message based on whether there's a winner
  let status;
  if (winner) {
    // Example: status = "Winner is: X 🎁🎉💥"
    status = `Winner is: ${winner} 🎁🎉💥`;
  } else {
    // If no winner, show whose turn is next
    // Example: status = "Next Player: X" or "Next Player: O"
    status = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }

  // Parameter i is the index of the clicked square (0-8)
  const handleClick = (i) => {
    // If there's already a winner, ignore clicks to prevent further moves
    // Example: If winner = 'X', no more moves are allowed
    if (winner) return;

    // Create a copy of the current board to avoid mutating state directly
    // Example: newSquares = [...squares] creates a new array with same values
    const newSquares = [...squares];

    // Set the clicked square to 'X' or 'O' based on whose turn it is
    // Example: If i=3 and isXNext=true, newSquares[3] = 'X'
    newSquares[i] = isXNext ? 'X' : 'O';

    // Update the board state with the new board configuration
    // Example: setSquares updates squares to reflect the new move
    setSquares(newSquares);

    // Toggle the player for the next turn
    // Example: If isXNext=true, set to false (O's turn), and vice versa
    setIsXNext(!isXNext);
  };

  // Render a single square button with its current value and click handler
  // Parameter i is the index of the square (0-8)
  const renderSquare = (i) => {
    // Return a button element styled with 'square' class
    // On click, call handleClick with the square's index
    // Display the square's value (X, O, or null)
    // Example: For i=0, if squares[0] = 'X', button shows 'X'
    return (
      <button className='square' onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  // Reset the game to its initial state
  const resetGame = () => {
    // Set the next player to X (game always starts with X)
    setIsXNext(true);

    // Reset the board to an array of 9 null values
    // Example: squares = [null, null, null, null, null, null, null, null, null]
    setSquares(Array(9).fill(null));
  };

  // Render the game board and UI
  return (
    // Main container for the Tic-Tac-Toe game
    <div className='app_container'>
      {/* Display the game status (winner or next player) // Example: Shows
      "Winner is: X 🎁🎉💥" or "Next Player: O" */}
      <div className='status'>{status}</div>
      {/* Create 3 rows for the 3x3 grid // Example: row=0 renders squares 0,1,2;
      row=1 renders 3,4,5; row=2 renders 6,7,8 */}
      {[0, 1, 2].map((row) => (
        // Each row is a div with a unique key for React's reconciliation
        <div key={row} className='row'>
          {/* Render 3 squares per row, calculating their indices (row * 3 + col) */}
          {/* Example: For row=1, col=0,1,2 renders squares 3,4,5 */}
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
      {/* Button to reset the game, calls resetGame on click */}
      <button className='resetGame' onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
