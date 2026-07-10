// ============================================
// DATA STRUCTURE
// ============================================

// Maintain array of items with structure: { id, title, info }
// Ex: data.js → [{id: 1, title: "...", info: "..."}, ...]

// ============================================
// APP.JSX - SETUP
// ============================================

// State 1: Track checkbox status (allow multiple accordions open or not)
// useState(true) by default

// State 2: Track which accordions are currently open (activeAccordions)
// useState(new Set()) → Why Set? Fast lookup with .has()

// ============================================
// CHECKBOX HANDLER
// ============================================

// Simple toggle function
// setAllowMultipleOpen((prev) => !prev)

// ============================================
// CORE LOGIC: toggleAccordion Function
// ============================================

// Receives: id of clicked accordion

// STEP 1: Create new Set from previous state
// Why? To avoid mutating state directly

// STEP 2: Check if clicked accordion already open using .has(id)

// STEP 3: If already open → .delete(id) to close it

// STEP 4: If not open (else block):
// → First check: if (!allowMultipleOpen)
// → If true: .clear() the Set (closes all other accordions)
// → Then: .add(id) to open the clicked accordion

// STEP 5: Return the updated Set

// ============================================
// RENDERING IN APP.JSX
// ============================================

// Map over data array to render Accordion components

// Pass isActive prop: activeAccordions.has(item.id)
// This checks if accordion id exists in Set

// Pass toggleAccordion function and spread ...item props

// ============================================
// ACCORDION.JSX - CHILD COMPONENT
// ============================================

// onClick handler: call toggleAccordion(id) with accordion's id

// Conditional rendering: show info only when isActive is true
// Option 1: className={`accordion-content ${isActive ? 'open' : ''}`}
// Option 2: {isActive && <p>{info}</p>}

// ============================================
// LOGIC FLOW
// ============================================

// Checkbox CHECKED:
// → Click any accordion → add to Set → opens
// → Click multiple → all added to Set → all stay open
// → Click opened one → delete from Set → closes

// Checkbox UNCHECKED:
// → Click accordion → clear Set first → add new id → only one opens
// → Click another → clear Set → add new id → previous closes
// → Only one accordion can be open at a time

// ============================================
// KEY OPERATIONS
// ============================================

// .has(id) → Check if accordion is open
// .delete(id) → Close accordion (remove from Set)
// .add(id) → Open accordion (add to Set)
// .clear() → Close all accordions (empty the Set)
