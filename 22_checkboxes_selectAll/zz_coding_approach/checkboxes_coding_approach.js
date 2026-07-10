// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <CheckboxList /> component
// CheckboxList.jsx → contains all checkbox logic

// ============================================
// DATA STRUCTURE
// ============================================

// Checkbox object format:
// → { id: number, checked: boolean, color: string }

// Example:
// { id: 1, checked: false, color: 'blue' }

// Why this structure?
// → id: unique identifier for each checkbox
// → checked: current state (selected/unselected)
// → color: display label (could be any property)

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: checkboxes → useState([...])
// → Array of checkbox objects
// → Initial state: all unchecked (checked: false)
// → Example:
//   [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: false, color: 'yellow' },
//     { id: 3, checked: false, color: 'red' }
//   ]

// State 2: parentChecked → useState(false)
// → Boolean tracking parent/master checkbox state
// → true: all children selected (or parent checked)
// → false: not all children selected
// → Acts as "Select All" switch

// ============================================
// handleParentChange FUNCTION
// ============================================

// Purpose: Handle "Select All" checkbox click

// Accepts: e (event object)

// STEP 1: Get checkbox state
// → const checked = e.target.checked
// → Boolean: true if checked, false if unchecked
// → User's action on parent checkbox

// STEP 2: Update parent state
// → setParentChecked(checked)
// → Syncs parent checkbox state

// STEP 3: Update all children to match parent
// → setCheckboxes(checkboxes.map((checkbox) => ({ ...checkbox, checked })))

// Breaking down the map:
// → checkboxes.map((checkbox) => ...)
// → Iterate over each checkbox

// For each checkbox:
// → { ...checkbox, checked }
// → Spread all properties: { ...checkbox }
// → Override checked property with parent's state
// → All checkboxes get same checked value

// Example:
// → Parent checked to true
// → All checkboxes become: { id: X, checked: true, color: 'X' }

// → Parent unchecked to false
// → All checkboxes become: { id: X, checked: false, color: 'X' }

// Effect:
// → Click parent ON → all children turn ON
// → Click parent OFF → all children turn OFF
// → Master control behavior

// ============================================
// handleChildChange FUNCTION
// ============================================

// Purpose: Handle individual child checkbox click

// Curried function pattern:
// → (id) => (e) => { ... }
// → First call accepts id
// → Returns function that accepts event
// → Allows passing checkbox id to handler

// Why curried?
// → onChange needs function reference
// → Need to know which checkbox was clicked
// → Currying provides closure over id

// Accepts: id (checkbox identifier)
// Returns: event handler function

// Inner function accepts: e (event object)

// STEP 1: Update specific checkbox
// → const updatedCheckboxes = checkboxes.map((checkbox) => ...)

// Map logic:
// → Check each checkbox: checkbox.id === id
// → If match: { ...checkbox, checked: e.target.checked }
//   - Spread existing properties
//   - Update checked to new value
// → If no match: checkbox
//   - Return unchanged

// Example:
// → Click checkbox id: 2
// → Original: [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: false, color: 'yellow' },
//     { id: 3, checked: false, color: 'red' }
//   ]
// → Result: [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: true, color: 'yellow' },  ← only this changed
//     { id: 3, checked: false, color: 'red' }
//   ]

// STEP 2: Update checkboxes state
// → setCheckboxes(updatedCheckboxes)
// → Saves modified array

// STEP 3: Check if all children are now checked
// → setParentChecked(updatedCheckboxes.every((checkbox) => checkbox.checked))

// .every() method:
// → Tests if ALL elements pass condition
// → Returns true only if every checkbox.checked is true
// → Returns false if any checkbox.checked is false

// Example 1 - All checked:
// → updatedCheckboxes = [
//     { id: 1, checked: true, ... },
//     { id: 2, checked: true, ... },
//     { id: 3, checked: true, ... }
//   ]
// → .every((checkbox) => checkbox.checked) → true
// → setParentChecked(true) → parent checkbox automatically checked

// Example 2 - Some unchecked:
// → updatedCheckboxes = [
//     { id: 1, checked: true, ... },
//     { id: 2, checked: false, ... },  ← this one false
//     { id: 3, checked: true, ... }
//   ]
// → .every((checkbox) => checkbox.checked) → false
// → setParentChecked(false) → parent checkbox automatically unchecked

// Effect:
// → When last child checked → parent auto-checks
// → When any child unchecked → parent auto-unchecks
// → Maintains sync between parent and children

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'container'

// SECTION 1: Parent checkbox
// → label with className 'checkbox parent-checkbox'

// Parent input:
// → type='checkbox'
// → checked={parentChecked}
//   - Controlled input
//   - State determines if checked
// → onChange={handleParentChange}
//   - Triggers when clicked

// Checkmark span:
// → <span className='checkmark'></span>
//   - Custom styled checkbox visual
//   - CSS creates custom appearance

// Label text:
// → "Select All"
//   - User-friendly text

// SECTION 2: Child checkboxes
// → div with className 'checkbox-group'
//   - Groups all child checkboxes

// Map over checkboxes:
// → {checkboxes.map((checkbox) => ...)}

// For each checkbox:

// Label wrapper:
// → label with className 'checkbox'
// → key={checkbox.id}
//   - Required for React list rendering

// Child input:
// → type='checkbox'
// → checked={checkbox.checked}
//   - Controlled input
//   - Individual state from array
// → onChange={handleChildChange(checkbox.id)}
//   - Curried function
//   - First call passes id
//   - Returns event handler

// Checkmark span:
// → <span className='checkmark'></span>
//   - Custom styled visual

// Label text:
// → {checkbox.color}
//   - Displays color name
//   - Could be any property


// ============================================
// KEY CONCEPTS
// ============================================

// Why curried function? → Pass id to handler while maintaining function reference
// Why .every()? → Check if all children match condition
// Why spread operator? → Create new objects/arrays, immutability
// Why controlled inputs? → React state as single source of truth
// Why map for updates? → Transform array immutably
// Why parent state separate? → Track "Select All" independently
// Currying → (arg1) => (arg2) => result, creates closure
// .every(predicate) → Returns true only if all elements pass test
// Controlled component → value/checked prop synced with state
// Immutable update → map/spread create new references
// Closure → Inner function accesses outer function's variables
// Event handler → Function called when event occurs