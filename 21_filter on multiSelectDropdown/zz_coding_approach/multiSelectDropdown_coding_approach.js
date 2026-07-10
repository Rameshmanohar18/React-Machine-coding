// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main component with data and filter logic
// MultiSelectDropdown.jsx → reusable dropdown component

// ============================================
// DATA STRUCTURE
// ============================================

// Sample data format:
// → Array of objects with properties: id, category, name
// → { id: number, category: string, name: string }

// Example:
// [
//   { id: 1, category: 'electronics', name: 'Laptop' },
//   { id: 2, category: 'books', name: 'Novel' },
//   { id: 3, category: 'electronics', name: 'Smartphone' }
// ]

// Options format for dropdown:
// → Array of objects with value and label
// → { value: string, label: string }

// Example:
// [
//   { value: 'electronics', label: 'Electronics' },
//   { value: 'books', label: 'Books' }
// ]

// Why separate value and label?
// → value: internal identifier (matches data.category)
// → label: user-friendly display text

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// Hardcoded data:
// → const data = [array of items]
// → Could be from API or props
// → Source of truth for all items

// State 1: filters → useState([])
// → Array of selected filter values
// → Example: ['electronics', 'books']
// → Empty array means no filters (show all)

// State 2: filteredData → useState(data)
// → Array of items after applying filters
// → Initially shows all data
// → Updates based on filters state

// Options array:
// → const options = [dropdown choices]
// → Defines available filter categories
// → Maps to data.category values

// ============================================
// useEffect: FILTER DATA LOGIC
// ============================================

// Dependency: [filters]
// → Runs whenever filters array changes

// STEP 1: Check if no filters selected
// → if (filters.length === 0)
// → Empty array means show everything

// If no filters:
// → setFilteredData(data)
// → Display all original data
// → Reset to initial state

// STEP 2: Apply filters (else block)
// → Filter data based on selected categories

// Filter logic:
// → setFilteredData(data.filter((item) => filters.includes(item.category)))

// Breaking down:
// → data.filter((item) => ...)
// → Check each item

// Condition:
// → filters.includes(item.category)
// → Check if item's category is in selected filters
// → Returns true if match, false otherwise

// Example:
// → filters = ['electronics', 'books']
// → data = [
//     { id: 1, category: 'electronics', name: 'Laptop' },
//     { id: 2, category: 'books', name: 'Novel' },
//     { id: 3, category: 'clothing', name: 'Shirt' }
//   ]
// → Result: [
//     { id: 1, category: 'electronics', name: 'Laptop' },
//     { id: 2, category: 'books', name: 'Novel' }
//   ]
// → 'Shirt' excluded (clothing not in filters)

// Why useEffect?
// → Reactive updates when filters change
// → Separation of concerns (filtering logic isolated)
// → Automatic synchronization

// ============================================
// HANDLEFILTERCHANGE FUNCTION
// ============================================

// Purpose: Update filters when dropdown changes

// Accepts: selectedFilters (array of strings)
// → Example: ['electronics', 'books']

// Logic:
// → setFilters(selectedFilters)
// → Updates filters state
// → Triggers useEffect
// → Data gets filtered

// Why separate handler?
// → Clean callback for child component
// → Could add validation or logging here
// → Abstraction layer

// ============================================
// APP.JSX - JSX STRUCTURE
// ============================================

// Main wrapper: div with className 'App'

// SECTION 1: Dropdown component
// → <MultiSelectDropdown
//     options={options}
//     onChange={handleFilterChange}
//   />
// → Props:
//   - options: array of filter choices
//   - onChange: callback function

// SECTION 2: Filtered results list
// → <ul> element

// Map over filteredData:
// → {filteredData.map((item) => ...)}

// For each item:
// → <li key={item.id}>{item.name}</li>
// → key for React list rendering
// → Display item name

// ============================================
// MULTISELECTDROPDOWN.JSX - STATE
// ============================================

// State: selectedOptions → useState([])
// → Array of currently selected values
// → Example: ['electronics', 'books']
// → Empty initially (nothing selected)

// Props: { options, onChange }
// → options: array of available choices
// → onChange: callback to notify parent

// ============================================
// HANDLECHANGE FUNCTION (DROPDOWN)
// ============================================

// Purpose: Handle multi-select changes

// Accepts: event (change event object)

// STEP 1: Extract selected values from event
// → const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value)

// Breaking down Array.from:
// → First argument: event.target.selectedOptions
//   - HTMLCollection of selected <option> elements
//   - Not a real array (array-like object)
// → Second argument: mapping function
//   - (option) => option.value
//   - Extracts value from each option element

// Example:
// → User selects "Electronics" and "Books"
// → event.target.selectedOptions = [
//     <option value="electronics">Electronics</option>,
//     <option value="books">Books</option>
//   ]
// → Array.from transforms to: ['electronics', 'books']

// Why Array.from?
// → Converts array-like object to real array
// → Allows mapping in single operation
// → Clean, functional approach

// STEP 2: Update local state
// → setSelectedOptions(selectedValues)
// → Maintains controlled input

// STEP 3: Notify parent
// → onChange(selectedValues)
// → Calls parent's handleFilterChange
// → Parent updates filters state
// → Triggers filtering in parent

// ============================================
// MULTISELECTDROPDOWN.JSX - JSX
// ============================================

// Select element:
// → <select multiple ... />
// → multiple attribute enables multi-select
// → Allows selecting multiple options with Ctrl/Cmd+Click

// Select attributes:

// multiple:
// → HTML attribute for multi-selection
// → Browser shows scrollable list
// → Different from single-select dropdown

// value={selectedOptions}:
// → Controlled input
// → Array of selected values
// → React syncs with state

// onChange={handleChange}:
// → Triggers on selection change
// → Updates state and notifies parent

// className='custom-multi-select':
// → For custom CSS styling

// Map options:
// → {options.map((option) => ...)}

// For each option:
// → <option key={option.value} value={option.value}>
//     {option.label}
//   </option>
// → key: unique identifier
// → value: internal value (used in filtering)
// → Display: label (user-friendly text)

// ============================================
// CONTROLLED VS UNCONTROLLED
// ============================================

// Controlled select element:
// → value={selectedOptions}
// → State controls which options selected
// → onChange updates state
// → React single source of truth

// Why controlled?
// → Parent can programmatically set selection
// → Easy to reset/clear
// → Predictable behavior
// → State always in sync with UI

// ============================================
// PARENT-CHILD COMMUNICATION
// ============================================

// Data flow: Parent → Child (props)
// → options prop: available choices
// → onChange prop: callback function

// Data flow: Child → Parent (callback)
// → onChange(selectedValues) called
// → Parent receives array of selections
// → Parent updates its state
// → Triggers filtering

// Unidirectional data flow:
// → Parent owns filter state
// → Child reports selections
// → Parent processes and filters
// → Clear responsibility separation


// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Convert HTMLCollection to array with mapping
// Why multiple attribute? → Enable multi-selection in select element
// Why controlled select? → State as single source of truth
// Why onChange callback? → Parent-child communication pattern
// Why filters array? → Track multiple selected categories
// Why includes()? → Check if item's category matches any filter
// Array.from(arrayLike, mapFn) → Convert + map in one operation
// event.target.selectedOptions → HTMLCollection of selected <option> elements
// Controlled input → value prop synced with state
// Callback pattern → Child notifies parent via function prop