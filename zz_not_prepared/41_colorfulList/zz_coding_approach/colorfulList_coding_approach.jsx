// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: text → useState('')
// → Current text input value
// → Resets to empty after adding item

// State 2: color → useState('#FF0000')
// → Currently selected color (hex code)
// → Default: red (#FF0000)

// State 3: items → useState([])
// → Array of item objects: { id, text, color }
// → Stores all added items

// ============================================
// HANDLEADDITEM FUNCTION
// ============================================

// Purpose: Add new item to list with selected color

// STEP 1: Validation
// → if (!text) alert and return
// → Prevents adding empty items

// STEP 2: Create new item object
// → id: new Date().getTime() - unique timestamp
// → text: current text value
// → color: current color value

// STEP 3: Add to items array
// → setItems([...items, newItem])
// → Spreads existing items, appends new one

// STEP 4: Reset text input
// → setText('')
// → Clears input for next entry

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Text input
// → type='text'
// → value={text} - controlled
// → onChange={(e) => setText(e.target.value)}

// SECTION 2: Color dropdown
// → <select value={color}> - controlled
// → onChange={(e) => setColor(e.target.value)}
// → Options: Red (#FF0000), Green (#00FF00), Blue (#0000FF)

// SECTION 3: Add button
// → onClick={handleAddItem}
// → Triggers item addition

// SECTION 4: List display
// → <ul> with items.map()
// → Each <li> has key={item.id}
// → style={{ color: item.color }} - inline style for text color
// → Displays item.text

// ============================================
// KEY CONCEPTS
// ============================================

// Controlled inputs → value and onChange for both input and select
// new Date().getTime() → Generate unique ID using timestamp
// Spread operator [...items, newItem] → Immutably add to array
// Inline styles → style={{ color: item.color }} for dynamic styling
// Validation → Check if text exists before adding
// Reset after action → setText('') clears input after adding
// Hex color codes → #FF0000 (red), #00FF00 (green), #0000FF (blue)
// Object structure → Each item has id, text, and color properties