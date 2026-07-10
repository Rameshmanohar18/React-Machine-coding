// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Tabs /> component
// Tabs.jsx → main component managing active tab state (REFACTORED - data-driven)
// Tab.jsx → individual tab button component (unchanged)

// ============================================
// TABS.JSX - DATA-DRIVEN APPROACH
// ============================================

//  Define tabs as array of objects
// ============================================
// TABSDATA ARRAY STRUCTURE
// ============================================

// Purpose: Store all tab configuration in one place

// Structure:
// → const tabsData = [ { id, label, content }, { id, label, content }, ... ]
// → Each object represents one tab
// → Properties:
//   - id: unique identifier (number)
//   - label: text displayed on tab button (string)
//   - content: content to display when tab active (string or JSX)

// Example:
// → { id: 1, label: 'Tab 1', content: 'Content for tab 1' }
// → { id: 2, label: 'Tab 2', content: 'Content for tab 2' }

// ============================================
// STATE MANAGEMENT
// ============================================

// State: activeTab → useState(tabsData[0].id)
// → Tracks which tab is currently active
// → Stores tab ID from tabsData array
// → Default: tabsData[0].id (first tab in array)
// → Dynamic default based on array content

// Why tabsData[0].id instead of hardcoded 1?
// → Works regardless of what IDs you use
// → If tabsData changes, default still works
// → More flexible and maintainable

// ============================================
// FINDING ACTIVE CONTENT
// ============================================

// Purpose: Get content for currently active tab

// Method: Array.find() with optional chaining
// → const activeContent = tabsData.find((tab) => tab.id === activeTab)?.content

// Callback function: (tab) => tab.id === activeTab
// → Parameter 'tab' represents current tab object in iteration
// → Compares tab.id with activeTab state
// → Returns true when match found

// Example with activeTab = 2:
// → Iteration 1: tab = { id: 1, ... } → 1 === 2 → false → continue
// → Iteration 2: tab = { id: 2, ... } → 2 === 2 → true → RETURN this object
// → Result: { id: 2, label: 'Tab 2', content: 'Content for tab 2' }

// Optional chaining operator (?.)
// → Safely accesses .content property
// → If find() returns object → access .content → 'Content for tab 2'
// → If find() returns undefined → short-circuit → return undefined (no error)
// → Prevents: Cannot read property 'content' of undefined

// Alternative without optional chaining:
// → const activeTabObj = tabsData.find((tab) => tab.id === activeTab)
// → const activeContent = activeTabObj ? activeTabObj.content : null

// ============================================
// JSX STRUCTURE (TABS.JSX) - DYNAMIC RENDERING
// ============================================

// Main container: div with className 'container'

// Inner wrapper div

// SECTION 1: Tabs header (REFACTORED)
// → div with className 'tabs-header'
// → Contains dynamically generated Tab components

// Dynamic Tab generation using .map():
// → {tabsData.map((tab) => <Tab key={tab.id} ... />)}

// Map callback: (tab) => <Tab key={tab.id} label={tab.label} ... />
// → Parameter 'tab' represents current tab object
// → Access properties: tab.id, tab.label, tab.content

// Key prop importance:
// → key={tab.id} → unique identifier for React
// → React uses key to track which items changed/added/removed
// → Optimizes re-rendering performance
// → Should be stable (same ID each render)
// → Should be unique (no two tabs with same ID)

// Props passed to each Tab:
// → label={tab.label} → extracted from tab object
// → id={tab.id} → extracted from tab object
// → activeTab={activeTab} → current state from parent
// → setActiveTab={setActiveTab} → state setter from parent

// SECTION 2: Content display (UPDATED)
// → div with className 'tab-content'
// → Display: {activeContent}
// → activeContent comes from .find() method
// → Dynamically shows content based on active tab
// → Example: activeTab = 2 → activeContent = 'Content for tab 2'

// ============================================
// TAB.JSX - INDIVIDUAL TAB COMPONENT
// ============================================

// Purpose: Render single tab button with active styling (UNCHANGED)

// Props: { label, id, activeTab, setActiveTab }
// → label: button text (comes from tabsData[].label)
// → id: unique tab identifier (comes from tabsData[].id)
// → activeTab: current active tab ID from parent
// → setActiveTab: function to update active tab

// ============================================
// HANDLECLICK FUNCTION (TAB.JSX)
// ============================================

// Purpose: Update active tab when button clicked (UNCHANGED)

// Logic:
// → const handleClick = () => { setActiveTab(id) }
// → Calls parent's setActiveTab with this tab's id

// Example:
// → User clicks Tab 2 (id = 2)
// → handleClick runs
// → setActiveTab(2) called
// → Parent's activeTab state becomes 2
// → Parent re-renders
// → .find() returns new active content
// → All Tab components re-render with new activeTab prop

// ============================================
// ISACTIVE CALCULATION (TAB.JSX)
// ============================================

// Purpose: Determine if this tab is currently active (UNCHANGED)

// Logic:
// → const isActive = activeTab === id
// → Compares parent's activeTab with this tab's id
// → Returns boolean

// ============================================
// JSX STRUCTURE (TAB.JSX)
// ============================================

// Wrapper div

// Button element: (UNCHANGED)
// → onClick={handleClick} → triggers tab change
// → tabIndex={0} → keyboard accessible
// → className={`tab-button ${isActive ? 'active' : ''}`}
// → Display: {label}
