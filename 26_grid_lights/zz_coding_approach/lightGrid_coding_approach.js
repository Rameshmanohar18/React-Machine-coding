// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <LightGrid /> component
// LightGrid.jsx → complete grid game with activation/deactivation logic

// ============================================
// GRID LAYOUT CONCEPT
// ============================================

// 3x3 grid with center cell omitted:
// [0] [1] [2]
// [3] [X] [4]  ← X represents empty center (not clickable)
// [5] [6] [7]

// Total: 8 clickable cells numbered 0-7
// Cell IDs stored as strings: "row-col" format
// Examples: "0-0", "0-1", "1-2", "2-1"

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: activeCells → useState({})
// → Object storing active state of each cell
// → Structure: { "0-0": true, "0-1": false, "1-0": true }
// → Key: cellId string ("row-col")
// → Value: boolean (true = active/green, false = inactive/white)

// State 2: activationOrder → useState([])
// → Array tracking chronological click sequence
// → Stores cellId strings in order clicked
// → Example: ["0-0", "1-0", "2-2", "0-1"]
// → Used for reverse deactivation sequence

// State 3: isDeactivating → useState(false)
// → Boolean flag to prevent clicks during animation
// → true: deactivation sequence running, block all clicks
// → false: normal state, clicks allowed

// ============================================
// CELL ID TO INDEX MAPPING
// ============================================

// cellIdToIndex function:
// → Purpose: Convert internal cellId to display number (0-7)

// Accepts: cellId (string like "1-2")

// STEP 1: Parse cellId
// → const [row, col] = cellId.split('-').map(Number)
// → split('-') creates array: ["1", "2"]
// → map(Number) converts to numbers: [1, 2]

// STEP 2: Map to display number

// Row 0 (top row):
// → if (row === 0) return col
// → col 0 → 0, col 1 → 1, col 2 → 2
// → Direct mapping

// Row 1 (middle row):
// → if (row === 1) return col === 0 ? 3 : 4
// → col 0 → 3
// → col 2 → 4
// → col 1 skipped (center cell)

// Row 2 (bottom row):
// → if (row === 2) return col + 5
// → col 0 → 5, col 1 → 6, col 2 → 7
// → Offset by 5

// Examples:
// → cellIdToIndex("0-1") → 1
// → cellIdToIndex("1-0") → 3
// → cellIdToIndex("2-2") → 7

// ============================================
// handleCellClick FUNCTION
// ============================================

// Purpose: Activate cell when clicked and track order

// Accepts: cellId (string like "0-2")

// GUARD 1: Check if animation running
// → if (isDeactivating) return
// → Prevents interference with deactivation sequence
// → Early return stops execution

// GUARD 2: Check if cell already active
// → if (activeCells[cellId]) return
// → Prevents double-clicking same cell
// → Maintains exactly 8 activations max

// STEP 1: Activate the cell
// → setActiveCells((prev) => ({ ...prev, [cellId]: true }))
// → Functional update with previous state
// → Spread operator maintains other cells' states
// → Computed property [cellId] sets dynamic key
// → Example: { "0-0": true, [cellId]: true } → { "0-0": true, "0-1": true }

// STEP 2: Add to activation order
// → setActivationOrder((prev) => [...prev, cellId])
// → Spread previous array, append new cellId
// → Maintains chronological sequence
// → Example: ["0-0", "1-0"] → ["0-0", "1-0", "0-1"]

// ============================================
// renderCell FUNCTION
// ============================================

// Purpose: Render individual cell with number

// Accepts: cellId (string)

// STEP 1: Get active state
// → const isActive = activeCells[cellId] || false
// → Looks up cellId in activeCells object
// → Default to false if undefined (not yet activated)

// STEP 2: Get display number
// → const cellIndex = cellIdToIndex(cellId)
// → Converts cellId to user-friendly number (0-7)

// STEP 3: Return cell div
// → key={cellId} for React list rendering
// → Dynamic className: `cell ${isActive ? 'active' : ''}`
//   - Base: 'cell'
//   - Conditional: 'active' added when isActive is true
//   - CSS handles green background for .cell.active
// → onClick={() => handleCellClick(cellId)}
//   - Arrow function passes cellId to handler
// → Display: {cellIndex}
//   - Shows 0-7 number inside cell

// ============================================
// renderGrid FUNCTION
// ============================================

// Purpose: Build complete 3x3 grid layout

// STEP 1: Initialize empty array
// → const grid = []
// → Will hold all cell elements

// STEP 2: Nested loops for 3x3 grid
// → for (let row = 0; row < 3; row++)
//   → Outer loop: rows 0, 1, 2
// → for (let col = 0; col < 3; col++)
//   → Inner loop: columns 0, 1, 2

// STEP 3: Generate cellId for position
// → const cellId = `${row}-${col}`
// → Template literal creates string
// → Example: row=1, col=2 → "1-2"

// STEP 4: Handle center cell (special case)
// → if (row === 1 && col === 1)
//   → Center position check
// → grid.push(<div key={cellId} className='cell-empty' />)
//   → Empty placeholder div
//   - Maintains grid structure
//   - Same size as regular cells
//   - Not clickable

// STEP 5: Handle regular cells
// → else block
// → grid.push(renderCell(cellId))
//   → Calls renderCell to create clickable cell
//   → Adds to grid array

// STEP 6: Return grid array
// → return grid
// → React renders all elements in order

// Result: 9 elements total (8 cells + 1 empty)

// ============================================
// useEffect: DEACTIVATION TRIGGER
// ============================================

// Dependency array: [activeCells, activationOrder, isDeactivating]
// → Runs when any of these change

// STEP 1: Count active cells
// → const activeCount = Object.keys(activeCells).filter((key) => activeCells[key]).length

// Breaking down:
// → Object.keys(activeCells) → array of all cellId keys
// → .filter((key) => activeCells[key]) → keep only true values
// → .length → count of active cells

// Example:
// → activeCells = { "0-0": true, "0-1": true, "1-0": false }
// → Object.keys → ["0-0", "0-1", "1-0"]
// → filter → ["0-0", "0-1"]
// → length → 2

// STEP 2: Check trigger condition
// → if (activeCount === 8 && !isDeactivating)
// → All 8 cells active AND not already deactivating

// STEP 3: Set deactivating flag
// → setIsDeactivating(true)
// → Blocks new clicks during animation

// STEP 4: Initial delay (200ms)
// → setTimeout(() => { ... }, 200)
// → Brief pause to show last cell turn green
// → Prevents jarring instant reversal

// STEP 5: Create reverse order
// → const reverseOrder = [...activationOrder].reverse()
// → Spread creates copy (avoid mutation)
// → reverse() flips array
// → Example: [1st, 2nd, 3rd] → [3rd, 2nd, 1st]

// STEP 6: Iterate with staggered timing
// → reverseOrder.forEach((cellId, index) => { ... })
// → Loop through each cellId in reverse
// → index used for timing calculation

// STEP 7: Schedule individual deactivations
// → setTimeout(() => { ... }, index * 1800)
// → Each cell gets own timeout
// → Timing: 0ms, 1800ms, 3600ms, 5400ms, etc.
// → Creates staggered animation effect

// Inside each timeout:

// Sub-step A: Deactivate cell
// → setActiveCells((prev) => ({ ...prev, [cellId]: false }))
// → Functional update
// → Sets specific cell to false
// → Spread maintains other cells

// Sub-step B: Remove from order array
// → setActivationOrder((prev) => prev.filter((id) => id !== cellId))
// → filter creates new array without deactivated cellId
// → Maintains remaining order
// → Creates "pop" effect in order display

// STEP 8: Cleanup after last cell
// → if (index === reverseOrder.length - 1)
// → Check if this is the last cell
// → setTimeout(() => { reset logic }, 100)
//   - Brief delay ensures visual update completes
//   - setActivationOrder([]) → empty array
//   - setIsDeactivating(false) → allow clicks again

// ============================================
// JSX STRUCTURE
// ============================================

// Main wrapper: div with className 'light-grid-container'

// SECTION 1: Title
// → <h2>Light Grid Game</h2>

// SECTION 2: Instructions
// → Paragraph explaining game rules
// → Text: "Click cells to turn them green..."

// SECTION 3: Grid display
// → div with className 'grid'
// → Contains: {renderGrid()}
// → Renders all 9 elements (8 cells + 1 empty)

// SECTION 4: Status message (conditional)
// → {isDeactivating && <p className='status'>...</p>}
// → Only shows during deactivation
// → Text: "Deactivating in reverse order..."

// SECTION 5: Order display
// → div with className 'order-display'
// → Shows current activation sequence

// Order array display:
// → activationOrder.map((cellId) => cellIdToIndex(cellId)).join(', ')
// → Converts cellIds to numbers
// → Joins with commas
// → Example: "0, 3, 6, 7"

// Empty state hint:
// → {activationOrder.length === 0 && !isDeactivating && <span>...</span>}
// → Only shows when no cells clicked and not animating
// → Text: "(click cells to build order)"

// ============================================
// KEY CONCEPTS
// ============================================

// Why object for activeCells? → Fast lookup by cellId, O(1) access
// Why array for activationOrder? → Maintain sequence, easy to reverse
// Why string cellId format? → Unique, easy to generate, split for parsing
// Why computed property [cellId]? → Dynamic object keys
// Why spread operator? → Immutability, React change detection
// Why functional updates? → Avoid stale closures with async operations
// Why filter for removal? → Immutable array modification
// Why forEach with index? → Staggered timing calculation
// Why reverse copy? → Preserve original order for display
// Object.keys → Get array of object keys
// .split('-').map(Number) → Parse string to numbers
// Template literal className → Combine static and dynamic classes
// Guard clauses → Early returns for cleaner code
