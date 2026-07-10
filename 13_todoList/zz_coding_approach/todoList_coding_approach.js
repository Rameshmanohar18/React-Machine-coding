// ============================================
// COMPONENT STRUCTURE
// ============================================
// App.jsx → renders <TodoList /> component
// TodoList.jsx → contains all todo list logic
// data.js → initial todo items array
// ============================================
// DATA STRUCTURE
// ============================================
// initialItems from data.js:
// → Array of todo objects
// → Each object has 4 properties:
//   - id: unique identifier (string)
//   - text: todo item text (string)
//   - isEditing: editing mode flag (boolean, default false)
//   - isCompleted: completion status flag (boolean, default false)
// Example:
// → [{ id: '1', text: 'Buy groceries', isEditing: false, isCompleted: false }, ...]
// ============================================
// STATE MANAGEMENT
// ============================================
// State 1: todoItems → useState(initialItems)
// → Stores all todo items
// → Initialized with data from data.js file
// → Each item has: id, text, isEditing, isCompleted

// State 2: inputValue → useState('')
// → Tracks value in add todo input field
// → Starts as empty string

// State 3: filter → useState('all')
// → Tracks currently active filter
// → Possible values: 'all', 'completed', 'incomplete'
// → Starts as 'all' (show everything)
// ============================================
// DERIVED VALUES (computed from state)
// ============================================
// filteredItems → getFilteredItems()
// → Array of todos based on current filter
// → Used for rendering the list
// completedCount → todoItems.filter(isCompleted).length
// → Number of completed todos
// → Used in stats and "Remove Completed" button
// incompleteCount → todoItems.length - completedCount
// → Number of remaining todos
// → Used in stats display
// ============================================
// JSX STRUCTURE
// ============================================
// Main container div with className 'container text-center'
// SECTION 1: Form (for adding new todos)
// → Form element with:
//   - id='todoForm'
//   - onSubmit={handleSubmit}
// Inside form:
// → Input field with:
//   - type='text'
//   - id='todoItemInput'
//   - value={inputValue}
//   - onChange={(e) => setInputValue(e.target.value)}
//   - placeholder='Add a new item'
//   - autoComplete='off'
// SECTION 2: Stats bar
// → div with className='stats'
// → Three span elements showing:
//   - Total: {todoItems.length}
//   - Completed: {completedCount}
//   - Incomplete: {incompleteCount}
// SECTION 3: Filter buttons
// → div with className='filters'
// → Three buttons: All | Completed | Incomplete
// → Active button gets className='filter-btn active'
// → Inactive buttons get className='filter-btn'
// → Each onClick sets filter state to matching value
// SECTION 4: Remove Completed button (conditional)
// → Only renders when completedCount > 0
// → onClick={handleRemoveCompleted}
// → Shows count: "Remove Completed ({completedCount})"
// SECTION 5: Todo list (ul element)
// → ul with id='listContainer' and className='list-container'
// → Map over filteredItems: filteredItems.map((item) => ...)
// For each todo item, render li:
// → key={item.id}
// → className={item.isCompleted ? 'completed' : ''}
// Inside li, four parts:
// PART 1: Checkbox
// → type='checkbox'
// → checked={item.isCompleted}
// → onChange={() => handleToggleComplete(item.id)}
// → className='checkbox'
// PART 2: Conditional display (edit mode vs view mode)
// → Ternary: {item.isEditing ? ... : ...}
// If isEditing is true:
// → Input field with:
//   - type='text'
//   - value={item.text}
//   - onChange={(e) => handleEditChange(e, item.id)}
//   - onKeyDown={(e) => handleEditKeyDown(e, item.id)}
//   - onBlur={() => handleSaveEdit(item.id)
//   - autoFocus (focuses input automatically)
//   - className='edit-input'
// If isEditing is false:
// → Span with className='text'
//   - onDoubleClick={() => handleDoubleClick(item.id)}
//   - Display: {item.text}
// PART 3: Action buttons div (className='actions')
// → Edit/Save button (conditional):
//   - If isEditing: className='save', onClick={handleSaveEdit}, icon 💾
//   - If not editing: className='edit', onClick={handleDoubleClick}, icon ✏️
// → Delete button:
//   - className='delete'
//   - onClick={() => handleDelete(item.id)
//   - Display: 🗑️ (trash icon)
// SECTION 6: Empty state messages (two conditions)
// → Condition 1: filteredItems.length === 0 && todoItems.length > 0
//   - Shows: "No {filter} items" (e.g. "No completed items")
// → Condition 2: todoItems.length === 0
//   - Shows: "Ooops! List is empty"
// ============================================
// addTodoItem FUNCTION
// ============================================
// Purpose: Add new todo to list
// Accepts: item (the text for new todo)
// Logic:
// → setTodoItems((prevItems) => [...prevItems, newTodoObject])
// → Spread existing items, add new one at end
// New todo object structure:
// → { id: `${item}-${Date.now()}`, text: item, isEditing: false, isCompleted: false }
// Why this id format?
// → Combines item text with timestamp
// → Ensures uniqueness (Date.now() gives unique milliseconds)
// → Example: 'Buy milk-1634567890123'
// isEditing defaults to false → new items not in edit mode
// isCompleted defaults to false → new items start as incomplete
// ============================================
// handleDelete FUNCTION
// ============================================
// Purpose: Remove todo from list
// Accepts: id (id of todo to delete)
// Logic:
// → setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id))
// → Keep all todos where id doesn't match
// → Filter out the matching todo
// ============================================
// handleToggleComplete FUNCTION
// ============================================
// Purpose: Toggle isCompleted status of a todo
// Accepts: id (id of todo to toggle)
// Logic:
// → setTodoItems((prevItems) => prevItems.map(...))
// → Map over all items
// For each item:
// → Check: item.id === id
// → If match: { ...item, isCompleted: !item.isCompleted }
//   - Spread item properties
//   - Toggle isCompleted (true → false, false → true)
// → If no match: return item unchanged
// Example:
// → User clicks checkbox → handleToggleComplete('1')
// → isCompleted flips between true and false
// → li gets/loses 'completed' className
// ============================================
// handleDoubleClick FUNCTION
// ============================================
// Purpose: Enable edit mode for a specific todo
// Accepts: id (id of todo to edit)
// Logic:
// → setTodoItems((prevItems) => prevItems.map(...))
// → Find matching id, set isEditing: true (not toggle, always true)
// → All other items unchanged
// Triggered by:
// → Double-clicking the text span
// → Clicking the ✏️ edit button
// ============================================
// handleSaveEdit FUNCTION
// ============================================
// Purpose: Disable edit mode and save current text
// Accepts: id (id of todo to save)
// Logic:
// → setTodoItems((prevItems) => prevItems.map(...))
// → Find matching id, set isEditing: false (always false)
// → All other items unchanged
// Triggered by:
// → Clicking the 💾 save button
// → Pressing Enter key (via handleEditKeyDown)
// → Input losing focus (onBlur)
// ============================================
// handleEditChange FUNCTION
// ============================================
// Purpose: Update todo text while editing
// Accepts: (e, id)
// → e: event object
// → id: id of todo being edited
// STEP 1: Get new value from input
// → const newValue = e.target.value
// STEP 2: Update todos array
// → setTodoItems((prevItems) => prevItems.map(...))
// → Find matching id, update text with newValue
// → All other items unchanged
// Example:
// → Every keystroke triggers onChange
// → handleEditChange updates text in state
// → Input reflects new text immediately (controlled component)
// ============================================
// handleEditKeyDown FUNCTION
// ============================================
// Purpose: Save edit when Enter key is pressed
// Accepts: (e, id)
// → e: keyboard event object
// → id: id of todo being edited
// Logic:
// → if (e.key === 'Enter') → call handleSaveEdit(id)
// → All other keys ignored
// Example:
// → User presses Enter while editing
// → handleSaveEdit called → isEditing set to false
// → Span with updated text appears
// ============================================
// handleRemoveCompleted FUNCTION
// ============================================
// Purpose: Delete all completed todos at once
// Accepts: nothing
// Logic:
// → setTodoItems((prevItems) => prevItems.filter((item) => !item.isCompleted))
// → Keep only todos where isCompleted is false
// → All completed todos removed in one action
// Example:
// → User clicks "Remove Completed (3)"
// → All 3 completed todos removed from state
// → Only incomplete todos remain in list
// ============================================
// handleSubmit FUNCTION (ADD TODO)
// ============================================
// Purpose: Handle form submission to add new todo
// Accepts: e (event object)
// STEP 1: Prevent default form behavior
// → e.preventDefault()
// → Stops page refresh on submit
// STEP 2: Check if input has value (trimmed)
// → if (inputValue.trim())
// → Prevents adding whitespace-only todos
// STEP 3: Add new todo
// → addTodoItem(inputValue)
// STEP 4: Clear input field
// → setInputValue('')
// Trigger: User presses Enter key or submits form
// ============================================
// getFilteredItems FUNCTION
// ============================================
// Purpose: Return todos based on active filter
// Accepts: nothing (reads filter state)
// Logic (switch statement):
// → case 'completed': return todos where isCompleted === true
// → case 'incomplete': return todos where isCompleted === false
// → default ('all'): return all todos
// Why derived value, not state?
// → No need to store separately, computed from existing state
// → Always in sync with todoItems and filter state
// ============================================
// TODO LIST FLOW
// ============================================
// Initial state:
// → todoItems = initialItems from data.js
// → inputValue = ''
// → filter = 'all'
// → All todos shown, all incomplete, all in view mode
// User types in add input:
// → inputValue updates with each keystroke
// User presses Enter (submit form):
// → handleSubmit called
// → e.preventDefault() stops page refresh
// → Check: inputValue.trim() not empty
// → addTodoItem(inputValue) adds new todo
// → New todo: { id, text, isEditing: false, isCompleted: false }
// → setInputValue('') clears input
// User clicks checkbox:
// → handleToggleComplete(item.id) called
// → isCompleted toggled
// → li gains/loses 'completed' className
// → completedCount and incompleteCount update automatically
// User double-clicks text OR clicks ✏️:
// → handleDoubleClick(item.id) called
// → isEditing set to true
// → Input field appears with autoFocus
// → Button changes to 💾
// User edits text in edit input:
// → handleEditChange updates text on each keystroke
// User presses Enter OR clicks 💾 OR clicks away (onBlur):
// → handleSaveEdit(item.id) called
// → isEditing set to false
// → Span with updated text appears
// → Button changes back to ✏️
// User clicks 🗑️:
// → handleDelete(item.id) called
// → Todo filtered out of state
// User clicks filter buttons (All / Completed / Incomplete):
// → setFilter updates filter state
// → getFilteredItems() returns matching todos
// → List re-renders with filtered results
// → Active button gets 'active' className
// User clicks "Remove Completed":
// → handleRemoveCompleted called
// → All isCompleted todos removed
// → Button disappears (completedCount becomes 0)
// All todos deleted:
// → todoItems.length === 0
// → "Ooops! List is empty" message appears
// Filter has no matches (e.g. no completed items):
// → filteredItems.length === 0 && todoItems.length > 0
// → "No {filter} items" message appears
// ============================================
// CSS APPROACH
// ============================================
// .container:
// → Center content on page
// → display: flex, flex-direction: column
// → align-items: center
// #todoForm:
// → Margin bottom for spacing
// .stats:
// → display: flex, gap for spacing
// → Shows total/completed/incomplete counts
// .stat-item:
// → Individual stat badge styling
// .filters:
// → display: flex, gap for spacing
// → Contains filter buttons
// .filter-btn:
// → Base button styling, cursor: pointer
// .filter-btn.active:
// → Highlighted style for selected filter
// → Background or border to show active state
// .remove-completed:
// → Distinct styling (e.g. red/warning color)
// → cursor: pointer, padding
// .list-container:
// → list-style: none, padding: 0
// li (todo item):
// → display: flex, align-items: center
// → padding, margin for spacing
// → border or background for visibility
// li.completed:
// → text-decoration: line-through
// → Reduced opacity to show completed state
// .checkbox:
// → Margin right for spacing from text
// .text (todo text span):
// → flex: 1 (takes available space)
// → text-align: left
// → cursor: pointer (indicates double-click interaction)
// .edit-input:
// → flex: 1, padding, border styling
// → Matches span width for seamless transition
// .actions:
// → display: flex, gap for spacing between buttons
// Buttons (.edit, .save, .delete):
// → Padding, cursor: pointer
// → Background, border styling
// → Hover effects for better UX
// → Font size for emoji visibility
// .no-elements:
// → Font styling, color
// → Center alignment, padding for spacing
// ============================================
// KEY CONCEPTS
// ============================================
// Why isCompleted property? → Track completion status separately from editing
// Why isEditing property? → Track which todos are in edit mode
// Why filter state? → Derive different list views without duplicating data
// Why getFilteredItems()? → Compute filtered list from state, always in sync
// Why derived counts? → completedCount/incompleteCount computed, not stored
// Why controlled inputs? → React controls value, enables validation
// Why inputValue.trim()? → Prevent adding whitespace-only todos
// Why e.preventDefault()? → Prevent page refresh on form submit
// Why Date.now() in id? → Create unique timestamps for ids
// Why map for updates? → Immutability, create new array with changes
// Why filter for delete? → Create new array without deleted item
// Why spread operator? → Preserve other properties when updating one
// Why conditional rendering? → Show input or span based on isEditing mode
// Why dynamic button icon? → Visual feedback for current state (✏️ vs 💾)
// Why autoFocus on edit input? → Immediately ready to type, better UX
// Why onBlur to save? → Auto-save when user clicks away from edit input
// Why onKeyDown for Enter? → Alternative save trigger without clicking button
// Why two empty state conditions? → Distinguish "list empty" from "filter empty"
// Why li className based on isCompleted? → CSS hook for strikethrough styling
// Template literal for id → Combine text and timestamp for uniqueness
// Ternary operator → Concise conditional rendering in JSX
// Switch statement in getFilteredItems → Clean multi-case filter logic
