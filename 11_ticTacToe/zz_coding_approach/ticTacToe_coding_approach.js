// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all game logic (no separate components needed)

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: squares → useState(Array(9).fill(null))
// → Array with 9 null values representing empty board
// → Example: [null, null, null, null, null, null, null, null, null]
// → Indices 0-8 map to board positions (0=top-left, 8=bottom-right)

// State 2: isXNext → useState(true)
// → Tracks whose turn it is
// → true = X's turn, false = O's turn
// → Starts as true (X always goes first)

// ============================================
// WINNING COMBINATIONS ARRAY
// ============================================

// Define all 8 possible winning patterns:
// → 3 rows: [0,1,2], [3,4,5], [6,7,8]
// → 3 columns: [0,3,6], [1,4,7], [2,5,8]
// → 2 diagonals: [0,4,8], [2,4,6]

// Store in array: winningCombinations
// → Example: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

// ============================================
// calculateWinner FUNCTION
// ============================================

// Purpose: Check if anyone has won the game

// STEP 1: Loop through all winning combinations
// → for loop: i = 0 to winningCombinations.length

// STEP 2: Destructure current combination
// → const [a, b, c] = winningCombinations[i]
// → Example: First iteration → [a, b, c] = [0, 1, 2]

// STEP 3: Check if three positions match
// → Condition: squares[a] && squares[a] === squares[b] && squares[a] === squares[c]

// Breaking down the condition:
// → squares[a] → Checks position is not null (someone played there)
// → squares[a] === squares[b] → First two positions match
// → squares[a] === squares[c] → First and third positions match
// → All three must be true for a win

// Example:
// → squares = ['X', 'X', 'X', null, null, null, null, null, null]
// → Checking [0,1,2]: squares[0]='X', squares[1]='X', squares[2]='X'
// → 'X' && 'X'==='X' && 'X'==='X' → true

// STEP 4: Return winner or null
// → If match found: return squares[a] (returns 'X' or 'O')
// → If no match after all loops: return null

// Store result in variable:
// → let winner = calculateWinner()

// ============================================
// STATUS MESSAGE LOGIC
// ============================================

// Variable: status (not state, just display message)

// Logic:
// → if (winner) → status = `Winner is: ${winner} 🎁🎉💥`
// → else → status = `Next Player: ${isXNext ? 'X' : 'O'}`

// Example outcomes:
// → "Winner is: X 🎁🎉💥"
// → "Next Player: O"

// ============================================
// handleClick FUNCTION (CORE GAME LOGIC)
// ============================================

// Accepts: i (index of clicked square, 0-8)

// STEP 1: Check if game is over
// → if (winner) return
// → Prevents moves after someone wins
// → Early return stops function execution

// STEP 2: Create copy of squares array
// → const newSquares = [...squares]
// → Why copy? Never mutate state directly
// → Spread operator creates new array with same values

// STEP 3: Update clicked square
// → newSquares[i] = isXNext ? 'X' : 'O'
// → If X's turn, place 'X'; if O's turn, place 'O'
// → Example: isXNext=true, i=4 → newSquares[4] = 'X'

// STEP 4: Update board state
// → setSquares(newSquares)
// → Triggers re-render with new board configuration

// STEP 5: Toggle player turn
// → setIsXNext(!isXNext)
// → Flips between true and false
// → Example: true → false (X's turn → O's turn)

// ============================================
// renderSquare FUNCTION
// ============================================

// Purpose: Render individual square button

// Accepts: i (square index 0-8)

// Returns button element with:
// → className='square' for styling
// → onClick={() => handleClick(i)} → passes index to handler
// → Display: {squares[i]} → shows 'X', 'O', or nothing (null)

// Example:
// → renderSquare(0) → button for top-left corner
// → If squares[0] = 'X', button shows 'X'

// ============================================
// resetGame FUNCTION
// ============================================

// Purpose: Reset game to initial state

// STEP 1: Reset turn to X
// → setIsXNext(true)
// → X always starts

// STEP 2: Clear the board
// → setSquares(Array(9).fill(null))
// → Creates new array of 9 nulls
// → All squares become empty

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'app_container'

// SECTION 1: Status display
// → div with className 'status'
// → Shows: {status} (winner message or next player)

// SECTION 2: Game board (3x3 grid using nested maps)
// → Outer map: [0, 1, 2].map((row) => ...)
// → Creates 3 rows (row = 0, 1, 2)

// Each row is a div with:
// → key={row} for React list rendering
// → className='row' for styling

// Inner map inside each row: [0, 1, 2].map((col) => ...)
// → Creates 3 columns per row (col = 0, 1, 2)
// → Calls: renderSquare(row * 3 + col)

// Index calculation: row * 3 + col
// → Row 0: 0*3+0=0, 0*3+1=1, 0*3+2=2 (squares 0,1,2)
// → Row 1: 1*3+0=3, 1*3+1=4, 1*3+2=5 (squares 3,4,5)
// → Row 2: 2*3+0=6, 2*3+1=7, 2*3+2=8 (squares 6,7,8)

// SECTION 3: Reset button
// → button with className 'resetGame'
// → onClick={resetGame}
// → Text: "Reset Game"

// ============================================
// GAME FLOW EXAMPLE
// ============================================

// Initial state:
// → squares = [null, null, null, null, null, null, null, null, null]
// → isXNext = true
// → winner = null
// → status = "Next Player: X"
// → All squares empty

// Player X clicks center square (index 4):
// → handleClick(4) called
// → winner check: null → continue
// → newSquares = [...squares]
// → newSquares[4] = 'X' (isXNext is true)
// → setSquares(newSquares) → squares[4] now 'X'
// → setIsXNext(false) → O's turn
// → Re-render shows X in center
// → status = "Next Player: O"

// Player O clicks top-left (index 0):
// → handleClick(0) called
// → newSquares[0] = 'O' (isXNext is false)
// → setSquares updates
// → setIsXNext(true) → X's turn
// → status = "Next Player: X"

// Continuing play... X gets winning pattern [0,1,2]:
// → squares = ['X', 'X', 'X', 'O', 'X', null, 'O', null, null]
// → calculateWinner checks [0,1,2]
// → squares[0]='X', squares[1]='X', squares[2]='X'
// → All match → returns 'X'
// → winner = 'X'
// → status = "Winner is: X 🎁🎉💥"
// → Further clicks ignored (if winner check in handleClick)

// Player clicks Reset:
// → resetGame called
// → setIsXNext(true) → back to X's turn
// → setSquares(Array(9).fill(null)) → clear board
// → winner = null
// → status = "Next Player: X"
// → Game ready for new round

// ============================================
// CSS GRID LAYOUT
// ============================================

// .app_container:
// → display: flex, flex-direction: column
// → align-items: center
// → Centers game board on page

// .row:
// → display: flex
// → Creates horizontal row of squares

// .square:
// → width and height: 80px or similar
// → font-size: large (40px+)
// → border, background-color for visibility
// → cursor: pointer for clickability
// → Creates clickable game squares

// .status:
// → font-size, margin for visibility
// → Shows game status clearly

// .resetGame:
// → margin-top for spacing
// → padding, styling for button appearance

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array(9).fill(null)? → Create array of specific length with default values
// Why spread operator for newSquares? → Immutability, never mutate state
// Why isXNext toggle? → Simple boolean flip between two players
// Why row * 3 + col? → Convert 2D grid coordinates to 1D array index
// Why check winner before move? → Prevent moves after game ends
// Why nested map for board? → Create 3x3 grid structure dynamically
// Why destructuring in calculateWinner? → Clean access to array values
// Why squares[a] in condition? → Ensure position is not null (has been played)
// Why return in handleClick if winner? → Stop execution, prevent further moves
// 3x3 grid positions: top-left=0, center=4, bottom-right=8
// Winning check logic: All three positions non-null and equal
