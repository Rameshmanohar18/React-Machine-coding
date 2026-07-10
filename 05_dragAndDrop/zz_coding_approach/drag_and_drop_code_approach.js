// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <PuzzleGame /> component
// PuzzleGame.jsx → main component with drag/drop logic
// PuzzlePiece.jsx → child component for individual puzzle pieces

// ============================================
// INITIAL PIECES SETUP
// ============================================

// Create array of 9 puzzle pieces using Array.from
// Syntax: Array.from({ length: 9 }, (_, index) => ({ ... }))

// First param: { length: 9 } → creates array with 9 slots
// Second param: callback function with (_, index) → underscore ignores first arg

// Return object for each piece:
// → id: index + 1 (starts from 1, not 0)
// → url: `https://picsum.photos/200/200?random=${index + 1}`

// Result: [{id: 1, url: "..."}, {id: 2, url: "..."}, ... {id: 9, url: "..."}]

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: pieces → useState(initialPieces)
// → Holds current arrangement of puzzle pieces

// State 2: draggedPieceId → useState(null)
// → Tracks which piece is currently being dragged
// → null when no drag operation is happening

// ============================================
// DRAG START HANDLER
// ============================================

// handleDragStart function:
// → Accepts parameter: id (id of piece being dragged)
// → Simply: setDraggedPieceId(id)
// → Stores which piece user started dragging

// ============================================
// DROP HANDLER (CORE SWAPPING LOGIC)
// ============================================

// handleDrop function:
// → Accepts parameter: id (id of piece where drag ended/dropped)

// STEP 1: Use setPieces with callback (prevPieces) => { ... }

// STEP 2: Create copy of pieces array
// → const newPieces = [...prevPieces]
// → Never mutate state directly

// STEP 3: Find draggedIndex
// → const draggedIndex = newPieces.findIndex((p) => p.id === draggedPieceId)
// → Finds position of piece that was dragged
// → draggedPieceId comes from state (set in handleDragStart)

// STEP 4: Find droppedIndex
// → const droppedIndex = newPieces.findIndex((p) => p.id === id)
// → Finds position of piece where drag ended
// → id comes from function parameter

// STEP 5: Swap pieces using array destructuring
// → [newPieces[draggedIndex], newPieces[droppedIndex]] = [newPieces[droppedIndex], newPieces[draggedIndex]]
// → Swaps the two pieces in the array

// STEP 6: Return swapped array
// → return newPieces

// After setPieces callback:
// → setDraggedPieceId(null) to reset drag state

// ============================================
// RENDERING PIECES (JSX)
// ============================================

// Map over pieces array
// → pieces.map((piece) => <PuzzlePiece ... />)

// Pass props to each PuzzlePiece:
// → key={piece.id} → React key for list rendering
// → id={piece.id} → piece identifier
// → url={piece.url} → image URL
// → onDragStart={handleDragStart} → drag start handler
// → onDrop={handleDrop} → drop handler
// → onDragOver={(e) => e.preventDefault()} → allows drop by preventing default

// ============================================
// PUZZLEPIECE.JSX - CHILD COMPONENT
// ============================================

// Props: { id, url, onDragStart, onDrop, onDragOver }

// Returns div wrapper containing img element

// Div attributes (drag & drop events):
// → onDragStart={() => onDragStart(id)} → calls parent handler with piece id
// → onDrop={() => onDrop(id)} → calls parent handler with piece id
// → onDragOver={onDragOver} → prevents default to allow drop

// Img element:
// → src={url} → displays the puzzle piece image
// → alt={`Piece ${id}`} → accessibility text

// Note: draggable='true' can be added to div to make it draggable (HTML5 default)

// ============================================
// DRAG & DROP FLOW
// ============================================

// User starts dragging piece (id: 5):
// → onDragStart triggers on piece 5
// → Calls handleDragStart(5)
// → setDraggedPieceId(5) → state now tracks piece 5

// User drags over piece (id: 2):
// → onDragOver triggers
// → e.preventDefault() allows drop action

// User drops on piece (id: 2):
// → onDrop triggers on piece 2
// → Calls handleDrop(2)
// → handleDrop logic runs:
//   - Creates copy of pieces array
//   - Finds draggedIndex (where piece 5 is located)
//   - Finds droppedIndex (where piece 2 is located)
//   - Swaps piece 5 and piece 2 positions
//   - Returns new array
// → setDraggedPieceId(null) → resets drag state
// → Component re-renders with swapped pieces

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Create initial array with specific length and structure
// Why draggedPieceId state? → Track which piece is being moved
// Why findIndex? → Locate positions in array for swapping
// Why array destructuring for swap? → Clean one-line swap syntax
// Why e.preventDefault() in onDragOver? → Allow drop action (HTML5 default blocks it)
// Why pass id in handlers? → Identify which piece triggered the event
// Why copy array with spread? → Immutability - never mutate state directly
// Why set draggedPieceId to null after drop? → Clean up/reset drag state
// HTML5 drag/drop events order: dragStart → dragOver → drop
