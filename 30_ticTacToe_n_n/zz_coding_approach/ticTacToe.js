// ============================================
// CONFIGURATION
// ============================================

// BOARD_SIZE constant:
// → Controls grid size (3 for 3x3, 4 for 4x4, etc.)
// → Single point to scale entire game

// TOTAL_SQUARES calculation:
// → BOARD_SIZE * BOARD_SIZE
// → Example: 3x3 = 9, 4x4 = 16, 5x5 = 25

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: squares → useState(Array(TOTAL_SQUARES).fill(null))
// → Dynamic array based on board size
// → Stores 'X', 'O', or null for each square

// State 2: isXNext → useState(true)
// → Tracks current player
// → true = X's turn, false = O's turn

// ============================================
// calculateWinner FUNCTION
// ============================================

// Purpose: Dynamically generate and check all winning combinations

// STEP 1: Initialize empty winningCombinations array

// STEP 2: Generate row combinations
// → Nested loops: for row (0 to n-1), for col (0 to n-1)
// → Formula: row * BOARD_SIZE + col
// → Example 3x3: [0,1,2], [3,4,5], [6,7,8]
// → Example 4x4: [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]

// STEP 3: Generate column combinations
// → Nested loops: for col (0 to n-1), for row (0 to n-1)
// → Same formula but different iteration order
// → Example 3x3: [0,3,6], [1,4,7], [2,5,8]

// STEP 4: Generate main diagonal
// → Loop: i from 0 to BOARD_SIZE-1
// → Formula: i * (BOARD_SIZE + 1)
// → Example 3x3: [0,4,8]
// → Example 4x4: [0,5,10,15]

// STEP 5: Generate anti-diagonal
// → Loop: i from 0 to BOARD_SIZE-1
// → Formula: (i + 1) * (BOARD_SIZE - 1)
// → Example 3x3: [2,4,6]
// → Example 4x4: [3,6,9,12]

// STEP 6: Check each combination
// → Get first square value: firstValue = squares[combination[0]]
// → Skip if null
// → Loop through remaining squares in combination
// → Check if all match firstValue
// → Return winner if all match ('X' or 'O')
// → Return null if no winner

// ============================================
// HANDLECLICK FUNCTION
// ============================================

// Logic:
// → if (winner || squares[i]) return - prevent invalid moves
// → Create copy: newSquares = [...squares]
// → Set value: newSquares[i] = isXNext ? 'X' : 'O'
// → Update states: setSquares, setIsXNext(!isXNext)

// ============================================
// RENDERSQUARE FUNCTION
// ============================================

// Returns:
// → <button onClick={() => handleClick(i)}>{squares[i]}</button>

// ============================================
// RESETGAME FUNCTION
// ============================================

// Logic:
// → setIsXNext(true)
// → setSquares(Array(TOTAL_SQUARES).fill(null))
// → Dynamically creates array of correct size

// ============================================
// JSX STRUCTURE - DYNAMIC BOARD RENDERING
// ============================================

// Status display:
// → Shows winner or next player

// Board rendering (nested loops):
// → Outer loop: Array.from({ length: BOARD_SIZE }, (_, row) => ...)
//   - Creates BOARD_SIZE rows
// → Inner loop: Array.from({ length: BOARD_SIZE }, (_, col) => ...)
//   - Creates BOARD_SIZE columns per row
//   - Calculates index: row * BOARD_SIZE + col
//   - Calls renderSquare(index)

// Reset button:
// → onClick={resetGame}
// → Shows current board size: "Reset Game ({n}x{n})"

// ============================================
// KEY CONCEPTS
// ============================================

// Dynamic board size → Single constant scales entire game
// Index formula: row * n + col → Convert 2D position to 1D array index
// Main diagonal formula: i * (n + 1) → 0, 5, 10, 15 for 4x4
// Anti-diagonal formula: (i + 1) * (n - 1) → 3, 6, 9, 12 for 4x4
// Array.from({ length: n }) → Create array of specific length for mapping
// Dynamic winning combinations → Generate all rows, cols, diagonals programmatically
// Nested loops for grid → Outer (rows) × Inner (columns)
// Guard clauses → if (winner || squares[i]) return prevents invalid moves
// Array(n).fill(null) → Initialize board with nulls
// Spread operator [...squares] → Create copy before mutation
