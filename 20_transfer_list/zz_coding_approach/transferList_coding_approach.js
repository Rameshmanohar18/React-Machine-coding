// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <TransferList /> component
// TransferList.jsx → main component managing two lists
// ListComponent.jsx → reusable list display component
// data.js → initial data array

// ============================================
// DATA STRUCTURE
// ============================================

// Initial data format:
// → Array of objects with 3 properties
// → { id: number, name: string, checked: boolean }

// Example:
// [
//   { id: 1, name: 'Apple', checked: false },
//   { id: 2, name: 'Strawberry', checked: false }
// ]

// Why checked property?
// → Track checkbox state for each item
// → Determines which items to transfer
// → Boolean: true = selected, false = not selected

// ============================================
// TRANSFERLIST.JSX - STATE MANAGEMENT
// ============================================

// State 1: listA → useState(data)
// → Left list, starts with all initial data
// → Array of item objects

// State 2: listB → useState([])
// → Right list, starts empty
// → Items transferred from listA appear here

// Visual representation:
// List A (Source)    →→    List B (Destination)
// [All items]              [Empty initially]

// ============================================
// HANDLECHANGE FUNCTION
// ============================================

// Purpose: Toggle checkbox state for individual item

// Accepts: (id, listName)
// → id: unique identifier of item to toggle
// → listName: which list ('A' or 'B')

// STEP 1: Determine which setState to use
// → const setList = listName === 'A' ? setListA : setListB
// → Ternary picks correct setter based on listName
// → Dynamic function selection

// STEP 2: Update the list with functional update
// → setList((prevList) => prevList.map(...))

// Map logic:
// → prevList.map((item) => ...)
// → Check each item

// Conditional update:
// → item.id === id ? { ...item, checked: !item.checked } : item

// Breaking down:
// → If item.id matches parameter id:
//   - Spread item properties: { ...item }
//   - Toggle checked: checked: !item.checked
//   - Return new object with flipped checked value
// → If no match:
//   - Return item unchanged

// Example:
// → List: [{ id: 1, name: 'Apple', checked: false }, { id: 2, name: 'Strawberry', checked: false }]
// → handleChange(1, 'A')
// → Result: [{ id: 1, name: 'Apple', checked: true }, { id: 2, name: 'Strawberry', checked: false }]

// ============================================
// TRANSFER FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Move checked items from source to destination list

// Accepts: (sourceList, setSource, setDestination)
// → sourceList: array of items to transfer from
// → setSource: setState function for source list
// → setDestination: setState function for destination list

// Why pass setState functions?
// → Makes function reusable for both directions
// → A→B uses (listA, setListA, setListB)
// → B→A uses (listB, setListB, setListA)

// STEP 1: Filter and prepare items to transfer
// → const toTransfer = sourceList.filter(...).map(...)

// Filter logic:
// → sourceList.filter((item) => item.checked)
// → Keep only items where checked is true
// → These are the selected items

// Map logic:
// → .map((mappedItem) => ({ ...mappedItem, checked: false }))
// → Create new object for each selected item
// → Spread all properties: { ...mappedItem }
// → Reset checked to false: checked: false
// → Why reset? Items shouldn't be pre-selected in destination

// Example:
// → sourceList: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 2, name: 'Strawberry', checked: false },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → After filter: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → After map (toTransfer): [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// STEP 2: Add items to destination list
// → setDestination((dest) => dest.concat(toTransfer))
// → Functional update with previous destination
// → concat creates new array with existing + new items
// → Returns: [...existingItems, ...newItems]

// Example:
// → dest before: [{ id: 4, name: 'Blueberry', checked: false }]
// → toTransfer: [{ id: 1, name: 'Apple', checked: false }]
// → dest after: [{ id: 4, name: 'Blueberry', checked: false }, { id: 1, name: 'Apple', checked: false }]

// STEP 3: Remove transferred items from source
// → setSource((source) => source.filter((item) => !item.checked))
// → Functional update with previous source
// → Filter keeps only items where checked is false
// → Removes all checked items

// Example:
// → source before: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 2, name: 'Strawberry', checked: false }
//   ]
// → After filter: [{ id: 2, name: 'Strawberry', checked: false }]
// → Checked items removed

// ============================================
// JSX STRUCTURE (TRANSFERLIST.JSX)
// ============================================

// Main wrapper: div with className 'transfer-list'

// SECTION 1: List A (left side)
// → <ListComponent
//     listData={listA}
//     listType='A'
//     handleChange={handleChange}
//   />

// SECTION 2: Transfer controls (center buttons)
// → div with className 'transfer-controls'

// Button 1 - Transfer A to B (right arrow):
// → onClick={() => transfer(listA, setListA, setListB)}
// → Passes List A as source, List B as destination
// → Symbol: &gt; (HTML entity for >)

// Button 2 - Transfer B to A (left arrow):
// → onClick={() => transfer(listB, setListB, setListA)}
// → Passes List B as source, List A as destination
// → Symbol: &lt; (HTML entity for <)

// SECTION 3: List B (right side)
// → <ListComponent
//     listData={listB}
//     listType='B'
//     handleChange={handleChange}
//   />

// ============================================
// LISTCOMPONENT.JSX - REUSABLE LIST
// ============================================

// Purpose: Display list with checkboxes

// Props: { listData, listType, handleChange }
// → listData: array of items to display
// → listType: 'A' or 'B' for identification
// → handleChange: callback for checkbox changes

// JSX Structure:

// Wrapper: div with className 'list-box'

// Header:
// → <h3>{`List ${listType}`}</h3>
// → Template literal: "List A" or "List B"

// List container:
// → <ul> element

// Map over items:
// → {listData.map((item) => ...)}

// For each item:

// List item:
// → <li key={item.id}>
// → Unique key for React

// Label wrapper:
// → <label> wraps checkbox and text
// → Clicking text toggles checkbox

// Checkbox input:
// → type='checkbox'
// → onChange={() => handleChange(item.id, listType)}
//   - Calls parent handler with item id and list type
// → checked={item.checked}
//   - Controlled input, reflects state

// Item name:
// → {item.name}
// → Displays after checkbox

// ============================================
// TRANSFER LIST FLOW
// ============================================

// Initial state:
// → listA = [6 items with checked: false]
// → listB = []
// → Both lists rendered
// → All items in List A
// → List B empty

// User checks "Apple" in List A:
// → Checkbox onChange fires
// → handleChange(1, 'A') called
// → setList is setListA (listName === 'A')
// → Map finds item with id: 1
// → Updates: { id: 1, name: 'Apple', checked: true }
// → List A re-renders
// → "Apple" checkbox now checked

// User checks "Pineapple" in List A:
// → handleChange(3, 'A') called
// → Map finds item with id: 3
// → Updates: { id: 3, name: 'Pineapple', checked: true }
// → List A re-renders
// → Both "Apple" and "Pineapple" checked

// User clicks right arrow button (→):
// → onClick triggers
// → transfer(listA, setListA, setListB) called

// Transfer execution:

// Step 1 - Filter and map:
// → sourceList (listA) filters checked items
// → Found: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → Map resets checked to false:
// → toTransfer = [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// Step 2 - Add to destination:
// → setListB called with concat
// → listB was [] (empty)
// → Now: [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// Step 3 - Remove from source:
// → setListA called with filter
// → Removes items where checked is true
// → listA now: [
//     { id: 2, name: 'Strawberry', checked: false },
//     { id: 4, name: 'Blueberry', checked: false },
//     { id: 5, name: 'Mango', checked: false },
//     { id: 6, name: 'Chocolate', checked: false }
//   ]

// After transfer:
// → List A shows 4 items (remaining)
// → List B shows 2 items (transferred)
// → No items are checked

// User checks "Apple" in List B:
// → handleChange(1, 'B') called
// → setList is setListB (listName === 'B')
// → "Apple" checkbox checked in List B

// User clicks left arrow button (←):
// → transfer(listB, setListB, setListA) called
// → "Apple" transferred back to List A
// → Removed from List B

// Final state after moving back:
// → List A has 5 items (4 original + Apple returned)
// → List B has 1 item (Pineapple remaining)

// ============================================
// BIDIRECTIONAL TRANSFER
// ============================================

// Transfer A → B:
// → Button: onClick={() => transfer(listA, setListA, setListB)}
// → sourceList = listA (current items in left list)
// → setSource = setListA (update left list)
// → setDestination = setListB (update right list)
// → Effect: Checked items move from left to right

// Transfer B → A:
// → Button: onClick={() => transfer(listB, setListB, setListA)}
// → sourceList = listB (current items in right list)
// → setSource = setListB (update right list)
// → setDestination = setListA (update left list)
// → Effect: Checked items move from right to left

// Why same function works both ways?
// → Parameters are generic (source/destination)
// → No hardcoded list references
// → Function logic doesn't depend on direction
// → Completely reusable

// ============================================
// STATE UPDATE PATTERNS
// ============================================

// Immutability maintained:
// → map creates new array
// → { ...item } creates new object
// → concat creates new array
// → filter creates new array
// → Never mutate state directly

// Functional updates used:
// → setList((prevList) => ...)
// → setDestination((dest) => ...)
// → setSource((source) => ...)
// → Ensures latest state access
// → Critical with multiple state updates

// Controlled inputs:
// → checked={item.checked}
// → State controls checkbox
// → onChange syncs user action to state
// → React single source of truth

// ============================================
// CSS STRUCTURE (EXPECTED)
// ============================================

// .App:
// → Main app container
// → Centering, padding

// .transfer-list:
// → display: flex
// → justify-content: center
// → align-items: flex-start
// → gap: 20px (spacing between sections)
// → Creates horizontal layout

// .list-box:
// → border: 1px solid #ccc
// → padding: 20px
// → min-width: 200px
// → min-height: 300px
// → background: white

// .list-box h3:
// → margin-top: 0
// → text-align: center

// .list-box ul:
// → list-style: none
// → padding: 0

// .list-box li:
// → margin: 10px 0
// → padding: 5px

// .list-box label:
// → display: flex
// → align-items: center
// → cursor: pointer

// .list-box input[type='checkbox']:
// → margin-right: 10px
// → cursor: pointer

// .transfer-controls:
// → display: flex
// → flex-direction: column
// → gap: 10px
// → justify-content: center
// → Vertical button stack

// .transfer-controls button:
// → padding: 10px 20px
// → font-size: 20px
// → cursor: pointer
// → border: 1px solid #333
// → background: #f0f0f0
// → border-radius: 4px

// .transfer-controls button:hover:
// → background: #e0e0e0

// ============================================
// EDGE CASES HANDLED
// ============================================

// No items checked:
// → filter returns empty array
// → concat with empty array does nothing
// → Source filter removes nothing
// → No visual change (expected behavior)

// All items checked:
// → All items transferred
// → Source becomes empty
// → Destination receives all
// → Empty list shows header only

// Check and uncheck:
// → handleChange toggles back to false
// → Item not included in transfer
// → Works as expected

// Multiple transfers:
// → Items can move back and forth
// → State updates correctly each time
// → No data loss

// Empty list operations:
// → Transfer from empty list does nothing
// → Filter/map on empty array returns empty array
// → No errors

// ============================================
// REUSABILITY BENEFITS
// ============================================

// ListComponent reused:
// → Same component for both lists
// → Props customize behavior
// → DRY principle (Don't Repeat Yourself)

// Transfer function generic:
// → Works for any direction
// → No duplicate logic
// → Easy to maintain

// Scalability:
// → Easy to add List C, D, etc.
// → Just add new state and buttons
// → Transfer function handles any source/destination

// ============================================
// KEY CONCEPTS
// ============================================

// Why filter + map? → Select items, transform properties
// Why concat? → Immutably combine arrays
// Why functional updates? → Access latest state in async operations
// Why spread operator? → Create new objects/arrays, maintain immutability
// Why controlled inputs? → React state as single source of truth
// Why pass setState? → Makes function reusable, direction-agnostic
// Why reset checked? → Clean state in destination, prevent confusion
// Why listType prop? → Identify which list triggered change
// .filter() → Create new array with matching elements
// .map() → Transform each element, create new array
// .concat() → Combine arrays without mutation
// Ternary operator → Inline conditional (condition ? ifTrue : ifFalse)
// Template literal → Dynamic strings with ${expression}
// HTML entities → &gt; (>), &lt; (<) for special characters
// Controlled component → Value controlled by React state