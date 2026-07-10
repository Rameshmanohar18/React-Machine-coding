// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main container, holds final JSON structure
// JSONCreator.jsx → recursive component (renders itself for nested objects)

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State 1: jsonStructure → useState({})
// → Stores the entire JSON object being built

// State 2: jsonOutput → useState('')
// → Stores the stringified JSON for display in textarea

// ============================================
// APP.JSX - HANDLERS
// ============================================

// handleDataChange function:
// → Accepts: (id, key, value, children)
// → Updates: setJsonStructure({ [key]: value, children })
// → Uses computed property name [key] for dynamic key
// → Wrapped in useCallback for performance

// handleGetJSON function:
// → Converts jsonStructure to formatted string
// → JSON.stringify(jsonStructure, null, 2)
// → null = no replacer function
// → 2 = indentation spaces for readability
// → Sets result in jsonOutput state

// ============================================
// APP.JSX - RENDERING
// ============================================

// Renders root JSONCreator component:
// → id={0} → root level identifier
// → data={jsonStructure} → current structure
// → onDataChange={handleDataChange} → callback to update structure

// "Get JSON" button:
// → onClick={handleGetJSON}
// → Triggers conversion to string

// Textarea for output:
// → readOnly → user cannot edit
// → value={jsonOutput} → displays formatted JSON
// → rows and cols for sizing

// ============================================
// JSONCREATOR.JSX - STATE MANAGEMENT
// ============================================

// Wrapped in React.memo → prevents unnecessary re-renders
// Props: { id, data, onDataChange }

// State 1: key → useState('')
// → Stores the key name for this JSON property

// State 2: value → useState('')
// → Stores the value for this JSON property

// State 3: children → useState([])
// → Stores array of child JSONCreator components
// → Each child is object: { id, data }

// ============================================
// useEffect: SYNC STATE TO PARENT
// ============================================

// Dependency array: [key, value, children, onDataChange, id]
// → Runs whenever any of these change

// Condition check: if (key !== '')
// → Only sync if key has meaningful value
// → Prevents syncing empty/initial state

// Call parent handler:
// → onDataChange(id, key, value, children)
// → Passes current state up to parent component

// ============================================
// HANDLEADD FUNCTION
// ============================================

// Purpose: Add a new child (nested object)

// Logic:
// → Create new child object: { id: Date.now(), data: {} }
// → Date.now() generates unique id (timestamp)
// → data: {} starts as empty object

// Update state:
// → setChildren([...children, newChild])
// → Spread existing children, add new one at end

// Wrapped in useCallback with [children] dependency

// ============================================
// HANDLEREMOVE FUNCTION
// ============================================

// Purpose: Remove a specific child

// Accepts: childId (id of child to remove)

// Logic:
// → setChildren(children.filter((child) => child.id !== childId))
// → Filter out child with matching id
// → Returns new array without that child

// Wrapped in useCallback with [children] dependency

// ============================================
// HANDLECHILDCHANGE FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Update data for a specific child

// Accepts: (childId, childKey, childValue, childChildren)
// → childId: which child to update
// → childKey, childValue, childChildren: new data for that child

// Uses setChildren with callback: (prevChildren) => { ... }

// STEP 1: Map over prevChildren array
// → Find child with matching id

// STEP 2: For matching child, update its data
// → { ...child, data: { [childKey]: childValue, children: childChildren } }
// → Spread existing child properties
// → Replace data with new structure

// STEP 3: For non-matching children, return as-is

// STEP 4: Optimization check
// → Compare JSON.stringify of updated vs previous
// → If no actual change, return prevChildren (prevents re-render)
// → If changed, return updatedChildren

// Wrapped in useCallback with empty [] dependency
// → Doesn't depend on children (uses prevChildren in callback)

// ============================================
// JSONCREATOR.JSX - RENDERING
// ============================================

// Input 1: Key input
// → value={key}
// → onChange={(e) => setKey(e.target.value)}

// Input 2: Value input
// → value={value}
// → onChange={(e) => setValue(e.target.value)}

// Add button:
// → onClick={handleAdd}
// → Adds new nested child

// Map over children array:
// → children.map((child) => ...)

// For each child:
// → Wrapped in div with key={child.id}
// → Recursively renders JSONCreator component:
//   - id={child.id}
//   - data={child.data}
//   - onDataChange={handleChildChange} → different handler for nested levels
// → Remove button:
//   - onClick={() => handleRemove(child.id)}
//   - Removes this specific child

// ============================================
// RECURSIVE FLOW EXAMPLE
// ============================================

// User creates root level:
// → Enters key: "user", value: "John"
// → Clicks "+" to add child

// handleAdd runs:
// → Creates child: { id: 1234567890, data: {} }
// → Adds to children array
// → Triggers re-render

// New JSONCreator renders (nested):
// → User enters key: "age", value: "25"
// → This calls handleChildChange on parent
// → Parent updates its children array with this child's data

// handleChildChange updates:
// → Finds child with id: 1234567890
// → Updates its data: { age: "25", children: [] }
// → Parent's useEffect triggers
// → Syncs up to App.jsx via onDataChange

// Click "Get JSON" button:
// → Converts entire structure to string
// → Displays in textarea
// → Result: {"user": "John", "children": [{"age": "25", "children": []}]}

// ============================================
// KEY CONCEPTS
// ============================================

// Why React.memo? → Prevents re-renders when props haven't changed
// Why recursive component? → Each JSONCreator can contain more JSONCreators (nested structure)
// Why Date.now() for id? → Unique timestamp, simple way to generate unique keys
// Why useCallback? → Prevents function recreation on every render (performance)
// Why filter for remove? → Creates new array without deleted item (immutable)
// Why map for update? → Creates new array with updated item (immutable)
// Why JSON.stringify comparison? → Deep equality check (detect actual data changes)
// Why [key] syntax? → Computed property name (dynamic object keys)
// Why prevChildren in callback? → Access most current state (avoid stale closures)
// Why check key !== ''? → Prevent syncing empty/initial state to parent
// Recursive rendering: Component renders itself for nested structures
