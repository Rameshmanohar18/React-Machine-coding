// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Main component with data fetching and rendering
// CategoryFilter.jsx → Dropdown for category selection

// ============================================
// DATA STRUCTURE UNDERSTANDING
// ============================================

// API Response structure:
// → Array of objects with properties: id, title, category, parent_objective_id

// Parent Objective (no parent):
// → { id: 'O1', title: 'Increase Sales', category: 'Sales', parent_objective_id: '' }

// Key Result (has parent):
// → { id: 'KR1', title: 'Increase revenue by 10%', category: 'Sales', parent_objective_id: 'O1' }

// Processed structure (after processData):
// → Parent with added properties:
// → { id: 'O1', title: '...', keyResults: [...], visible: true }

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State 1: data → useState([])
// → Stores processed objectives with key results
// → Each objective has: original properties + keyResults array + visible boolean

// State 2: filter → useState('All')
// → Current selected category filter
// → Values: 'All', 'Sales', 'Marketing', etc.

// State 3: categories → useState([])
// → Unique category list for dropdown
// → Example: ['All', 'Sales', 'Marketing', 'Engineering']

// ============================================
// useEffect: FETCH AND PROCESS DATA
// ============================================

// Dependency array: [filter]
// → Runs on mount and whenever filter changes
// → Note: Re-fetches API on every filter change (could be optimized)

// API endpoint:
// → fetch('https://okrcentral.github.io/sample-okrs/db.json')

// STEP 1: Fetch data
// → .then((response) => response.json())
// → Converts response to JSON

// STEP 2: Extract unique categories
// → const uniqueCategories = new Set(json.data.map((item) => item.category))
// → map extracts all category values
// → Set removes duplicates
// → Example: [{ category: 'Sales' }, { category: 'Sales' }] → Set {'Sales'}

// STEP 3: Set categories state
// → setCategories(['All', ...Array.from(uniqueCategories)])
// → Adds 'All' as first option
// → Spreads Set converted to array
// → Example: ['All', 'Sales', 'Marketing']

// STEP 4: Process and set data
// → setData(processData(json.data))
// → Calls processData function with raw API data
// → Sets result in data state

// STEP 5: Error handling
// → .catch((error) => console.error(...))
// → Logs fetch errors

// ============================================
// PROCESSDATA FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Transform flat API data into hierarchical structure

// Accepts: data (raw API response array)

// Returns: Array of parent objectives with keyResults and visible properties

// STEP 1: Initial data copy
// → let filteredData = data
// → Starts with all data

// STEP 2: Apply category filter
// → if (filter !== 'All')
// → Only process if specific category selected

// Filter logic:
// → filteredData = data.filter((item) => item.category === filter)
// → Example: filter = 'Sales' → only Sales category items

// STEP 3: Extract parent objectives
// → const objectives = filteredData.filter((item) => item.parent_objective_id === '')
// → Filter items without parent (empty string means no parent)
// → These are top-level objectives

// Example:
// → filteredData = [{ id: 'O1', parent_objective_id: '' }, { id: 'KR1', parent_objective_id: 'O1' }]
// → objectives = [{ id: 'O1', parent_objective_id: '' }]

// STEP 4: Add keyResults and visible to each parent
// → objectives.forEach((obj) => { ... })
// → Iterate over each parent objective

// For each parent:

// Sub-step A: Find matching key results
// → obj.keyResults = filteredData.filter((item) => item.parent_objective_id === obj.id)
// → Filter children where parent_objective_id matches parent's id
// → Adds keyResults array property to parent

// Example:
// → Parent: { id: 'O1', ... }
// → Children in filteredData: [{ parent_objective_id: 'O1' }, { parent_objective_id: 'O1' }]
// → Result: obj.keyResults = [child1, child2]

// Sub-step B: Set default visibility
// → obj.visible = true
// → All objectives start expanded (key results visible)

// STEP 5: Return processed objectives
// → return objectives
// → Array of parents with keyResults and visible properties

// ============================================
// handleFilterChange FUNCTION
// ============================================

// Purpose: Update filter when category selected

// Accepts: newFilter (string from dropdown)

// Logic:
// → setFilter(newFilter)
// → Updates filter state
// → Triggers useEffect (dependency on filter)
// → Re-fetches and processes data

// Example flow:
// → User selects 'Marketing' in dropdown
// → handleFilterChange('Marketing') called
// → setFilter('Marketing')
// → useEffect runs with filter = 'Marketing'
// → Data filtered to show only Marketing objectives

// ============================================
// toggleVisibility FUNCTION
// ============================================

// Purpose: Show/hide key results for specific objective

// Accepts: id (string, objective id to toggle)

// Logic:
// → Map over data array
// → Find objective with matching id
// → Toggle its visible property

// STEP 1: Map and mutate
// → const newData = data.map((obj) => { ... })

// STEP 2: Check for match
// → if (obj.id === id)

// STEP 3: Toggle visible flag
// → obj.visible = !obj.visible
// → true → false (collapse)
// → false → true (expand)

// STEP 4: Return object
// → return obj
// → Returns modified or unchanged object

// STEP 5: Update state
// → setData(newData)
// → Triggers re-render with new visibility

// Example:
// → Objective O1 has visible: true (expanded)
// → User clicks toggle icon
// → toggleVisibility('O1') called
// → obj.visible becomes false
// → Key results hidden

// ============================================
// renderObjective FUNCTION
// ============================================

// Purpose: Render single objective with key results

// Accepts: (objective, index)
// → objective: parent object with keyResults and visible
// → index: position in array (for numbering)

// Returns: JSX for objective container

// JSX Structure:

// Main container:
// → div with key={index} and className 'objective-container'

// SECTION 1: Objective header
// → div with className 'objective-header'

// Part A: Toggle icon (span)
// → className 'toggle-icon'
// → onClick={() => toggleVisibility(objective.id)}
// → Conditional icon:
//   - If objective.visible: faChevronDown (▼)
//   - If not visible: faChevronRight (▶)

// Part B: User icon
// → FontAwesomeIcon with icon={faUser}
// → className 'user-icon'

// Part C: Objective title
// → span with className 'objective-title'
// → Display: {index + 1}. {objective.title}
// → Example: "1. Increase Sales"

// SECTION 2: Key results (conditional)
// → Conditional: {objective.visible && ...}
// → Only renders if objective.visible is true

// Key results container:
// → div with className 'key-results'

// Map over keyResults:
// → objective.keyResults.map((kr, krIndex) => ...)

// For each key result:
// → div with key={krIndex} and className 'key-result'
// → FontAwesomeIcon with user icon
// → Display: {kr.title}

// Optional alphabetical prefix (commented):
// → {String.fromCharCode(97 + krIndex)}. {kr.title}
// → Would display: a. First KR, b. Second KR, etc.

// ============================================
// JSX STRUCTURE (APP.JSX)
// ============================================

// Main container: div with className 'App'

// Component 1: CategoryFilter
// → Props:
//   - categories={categories} → dropdown options
//   - onFilterChange={handleFilterChange} → callback function

// Component 2: Objectives list
// → {data.map(renderObjective)}
// → Maps over processed objectives
// → Renders each using renderObjective function

// ============================================
// CategoryFilter.JSX COMPONENT
// ============================================

// Purpose: Dropdown for category selection

// Props: { categories, onFilterChange }

// JSX Structure:

// Select element:
// → onChange={(e) => onFilterChange(e.target.value)}
// → Triggers callback with selected value
// → defaultValue='All' → starts with 'All' selected

// Map over categories:
// → categories.map((category) => ...)

// For each category:
// → option element with:
//   - key={category}
//   - value={category}
//   - Display: {category}

// Example:
// → categories = ['All', 'Sales', 'Marketing']
// → Renders 3 option elements

// ============================================
// APPLICATION FLOW
// ============================================

// Initial load:
// → Component mounts
// → useEffect runs (filter = 'All')
// → Fetches API data
// → Extracts categories: ['All', 'Sales', 'Marketing', ...]
// → Processes data with processData('All')
// → All objectives from all categories included
// → Each objective gets keyResults array and visible: true
// → CategoryFilter displays all categories
// → All objectives displayed with key results expanded

// User selects 'Sales' category:
// → CategoryFilter onChange triggered
// → onFilterChange('Sales') called
// → handleFilterChange updates filter to 'Sales'
// → useEffect runs (dependency changed)
// → Fetches API data again
// → processData runs with filter = 'Sales'
// → filteredData contains only Sales items
// → objectives filtered to Sales parents only
// → keyResults filtered to Sales children only
// → Component re-renders with Sales data only

// User clicks toggle icon on first objective:
// → toggleVisibility(objective.id) called
// → Maps through data array
// → Finds matching objective
// → Toggles visible from true to false
// → setData updates state
// → Component re-renders
// → Conditional {objective.visible && ...} is false
// → Key results hidden
// → Icon changes to faChevronRight (▶)

// User clicks toggle again:
// → visible toggles from false to true
// → Key results appear
// → Icon changes to faChevronDown (▼)

// ============================================
// DATA TRANSFORMATION EXAMPLE
// ============================================

// Raw API data:
// [
//   { id: 'O1', title: 'Increase Sales', category: 'Sales', parent_objective_id: '' },
//   { id: 'KR1', title: 'Revenue +10%', category: 'Sales', parent_objective_id: 'O1' },
//   { id: 'KR2', title: 'New clients +5', category: 'Sales', parent_objective_id: 'O1' },
//   { id: 'O2', title: 'Improve Marketing', category: 'Marketing', parent_objective_id: '' }
// ]

// After processData (filter = 'Sales'):
// [
//   {
//     id: 'O1',
//     title: 'Increase Sales',
//     category: 'Sales',
//     parent_objective_id: '',
//     keyResults: [
//       { id: 'KR1', title: 'Revenue +10%', category: 'Sales', parent_objective_id: 'O1' },
//       { id: 'KR2', title: 'New clients +5', category: 'Sales', parent_objective_id: 'O1' }
//     ],
//     visible: true
//   }
// ]

// After processData (filter = 'All'):
// [
//   { id: 'O1', ..., keyResults: [KR1, KR2], visible: true },
//   { id: 'O2', ..., keyResults: [], visible: true }
// ]

// ============================================
// KEY CONCEPTS
// ============================================

// Why Set for categories? → Automatic deduplication of category names
// Why Array.from? → Convert Set to array for mapping
// Why empty string check? → API uses '' for no parent (root objectives)
// Why forEach to mutate? → Adding properties to existing objects
// Why filter twice? → First for category, then for parent-child relationship
// Why visible property? → Track expand/collapse state per objective
// Why map in toggleVisibility? → Create new array with updated visibility
// Why index in renderObjective? → Numbering objectives (1., 2., 3.)
// Why conditional rendering? → Show/hide key results based on visible flag
// Why re-fetch on filter change? → Current implementation (could be optimized)
// parent_objective_id = '' → Root level objective (parent)
// parent_objective_id = 'O1' → Child of objective with id 'O1'
// New Set → Creates collection of unique values only
// obj.keyResults = [...] → Mutation adds new property to object
// !obj.visible → Boolean toggle (flip between true/false)