// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <ToastNotification /> component
// ToastNotification.jsx → contains all toast logic and configuration

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: horizontalPosition → useState('left')
// → Controls left or right placement
// → Options: 'left' or 'right'

// State 2: verticalPosition → useState('top')
// → Controls top or bottom placement
// → Options: 'top' or 'bottom'

// State 3: toastType → useState('success')
// → Controls toast styling/color
// → Options: 'success', 'error', 'warning', 'info'

// State 4: message → useState('This is a toast message!')
// → The text to display in toast
// → User can customize this

// State 5: duration → useState(5)
// → How long toast stays visible (in seconds)
// → Range: 3-10 seconds

// State 6: toasts → useState([])
// → Array storing all active toasts
// → Each toast is object: { message, toastType, horizontalPosition, verticalPosition, time }

// ============================================
// useEffect: AUTO-REMOVE TOASTS
// ============================================

// Dependency array: [duration]
// → Re-runs when duration changes

// STEP 1: Create interval that runs every 1000ms (1 second)
// → const timer = setInterval(() => { ... }, 1000)

// STEP 2: Inside interval, filter toasts array
// → setToasts((currentToasts) => currentToasts.filter(...))

// STEP 3: Filter logic - calculate toast age
// → const toastAge = Date.now() - toast.time
// → Date.now() = current timestamp in milliseconds
// → toast.time = timestamp when toast was created
// → Subtraction gives age in milliseconds

// Example calculation:
// → toast.time = 1634567890000 (creation time)
// → Date.now() = 1634567896000 (current time)
// → toastAge = 6000ms (6 seconds old)

// STEP 4: Keep toast if younger than duration
// → return toastAge < duration * 1000
// → duration * 1000 converts seconds to milliseconds
// → Example: duration = 5 → 5000ms
// → If toastAge = 4000ms → 4000 < 5000 → true (keep it)
// → If toastAge = 6000ms → 6000 < 5000 → false (remove it)

// STEP 5: Cleanup function
// → return () => clearInterval(timer)
// → Prevents memory leaks when component unmounts
// → Also clears when duration changes (new interval created)

// ============================================
// showToast FUNCTION
// ============================================

// Purpose: Add new toast to toasts array

// Logic:
// → setToasts([...toasts, newToastObject])
// → Spread existing toasts, add new one at end

// New toast object structure:
// → { message, toastType, horizontalPosition, verticalPosition, time: Date.now() }
// → Uses current state values for all properties
// → time: Date.now() → timestamp for tracking age

// Example:
// → { message: 'Success!', toastType: 'success', horizontalPosition: 'right', verticalPosition: 'bottom', time: 1634567890123 }

// ============================================
// removeToast FUNCTION
// ============================================

// Purpose: Manually remove specific toast

// Accepts: time (timestamp of toast to remove)

// Logic:
// → setToasts((currentToasts) => currentToasts.filter((toast) => toast.time !== time))
// → Filter out toast with matching timestamp
// → Keep all toasts where time doesn't match

// Example:
// → removeToast(1634567890123)
// → Removes toast with time: 1634567890123
// → All other toasts remain

// ========================== ==================
// JSX STRUCTURE - FORM SECTION
// ============================================

// Main container div with className 'container text-center'

// Form element with className 'flex'

// SECTION 1: Configuration inputs

// Select 1 - Horizontal Position:
// → value={horizontalPosition}
// → onChange={(e) => setHorizontalPosition(e.target.value)}
// → Options: 'left', 'right'

// Select 2 - Vertical Position:
// → value={verticalPosition}
// → onChange={(e) => setVerticalPosition(e.target.value)}
// → Options: 'top', 'bottom'

// Select 3 - Toast Type:
// → value={toastType}
// → onChange={(e) => setToastType(e.target.value)}
// → Options: 'success', 'error', 'warning', 'info'

// Input - Message:
// → type='text'
// → value={message}
// → onChange={(e) => setMessage(e.target.value)}
// → placeholder='Message'

// Input - Duration Slider:
// → type='range'
// → value={duration}
// → onChange={(e) => setDuration(e.target.value)}
// → min='3', max='10'
// → Wrapped in label with text 'Duration'

// Button - Show Toast:
// → type='button'
// → onClick={showToast}
// → Text: 'Show Toast'

// ============================================
// JSX STRUCTURE - TOAST DISPLAY SECTION
// ============================================

// Toast container div:
// → Dynamic className: `toast-container tc-${horizontalPosition}-${verticalPosition}`
// → Example: 'toast-container tc-left-top'
// → Example: 'toast-container tc-right-bottom'

// Map over toasts array:
// → toasts.map((toast, index) => ...)

// For each toast, render div:
// → key={index} for React list rendering
// → className={`toast ${toast.toastType}`}
// → Base class: 'toast'
// → Type class: toast's toastType ('success', 'error', 'warning', 'info')

// Inside toast div:

// Span for message:
// → className='toast-message'
// → Display: {toast.message}

// Button to remove:
// → className='remove'
// → onClick={() => removeToast(toast.time)}
// → Display: &#x2715; (Unicode for ✕ symbol)

// ============================================
// CSS APPROACH - POSITIONING
// ============================================

// .toast-container:
// → position: fixed (stays in place when scrolling)
// → z-index: high value (appears above other content)
// → pointer-events: none (allows clicks through container)

// Position-specific classes (using template literal):

// .tc-left-top:
// → top: 1rem
// → left: 1rem
// → Toasts appear in top-left corner

// .tc-left-bottom:
// → bottom: 1rem
// → left: 1rem
// → Toasts appear in bottom-left corner

// .tc-right-top:
// → top: 1rem
// → right: 1rem
// → Toasts appear in top-right corner

// .tc-right-bottom:
// → bottom: 1rem
// → right: 1rem
// → Toasts appear in bottom-right corner

// ============================================
// CSS APPROACH - TOAST STYLING
// ============================================

// .toast (base styling):
// → display: flex, justify-content: space-between
// → padding: 1rem
// → margin-bottom: 0.5rem (spacing between toasts)
// → border-radius: for rounded corners
// → pointer-events: auto (clickable, overrides container)
// → animation: slide-in or fade-in for entrance effect

// Type-specific colors:

// .toast.success:
// → background-color: green shade
// → color: white

// .toast.error:
// → background-color: red shade
// → color: white

// .toast.warning:
// → background-color: orange/yellow shade
// → color: dark text

// .toast.info:
// → background-color: blue shade
// → color: white

// .remove button:
// → background: transparent
// → border: none
// → cursor: pointer
// → font-size: larger for visibility
// → Hover effect for better UX

// ============================================
// TOAST NOTIFICATION FLOW
// ============================================

// Initial state:
// → horizontalPosition = 'left'
// → verticalPosition = 'top'
// → toastType = 'success'
// → message = 'This is a toast message!'
// → duration = 5
// → toasts = []
// → No toasts visible

// User configures settings:
// → Selects horizontalPosition = 'right'
// → Selects verticalPosition = 'bottom'
// → Selects toastType = 'error'
// → Types message = 'Something went wrong!'
// → Adjusts duration slider to 7

// User clicks "Show Toast":
// → showToast() called
// → New toast object created with current settings
// → Added to toasts array: [{ message: 'Something went wrong!', toastType: 'error', horizontalPosition: 'right', verticalPosition: 'bottom', time: 1634567890123 }]
// → Toast appears in bottom-right corner with red styling
// → Message displays: "Something went wrong!"

// useEffect interval running (every 1 second):
// → Checks all toasts in array
// → Calculates age of each toast
// → Toast created at 1634567890123, current time 1634567893123
// → Age = 3000ms (3 seconds)
// → Duration = 7 seconds (7000ms)
// → 3000 < 7000 → true → toast stays

// After 7 seconds:
// → Current time 1634567897123
// → Age = 7000ms
// → 7000 < 7000 → false → toast removed automatically
// → Toast disappears from screen

// User clicks ✕ button manually (before duration expires):
// → removeToast(1634567890123) called
// → Filters out toast with matching time
// → Toast immediately removed from array
// → Toast disappears from screen

// Multiple toasts:
// → User clicks "Show Toast" 3 times quickly
// → 3 toasts added to array with different timestamps
// → All appear stacked (margin between them)
// → Each auto-removes after 7 seconds from its creation
// → Or can be manually removed individually

// ============================================
// KEY CONCEPTS
// ============================================

// Why Date.now()? → Unique timestamp for each toast, tracks creation time
// Why setInterval? → Continuously check and remove old toasts
// Why filter in interval? → Remove toasts older than duration
// Why toastAge calculation? → Determine how long toast has been visible
// Why duration * 1000? → Convert seconds to milliseconds for comparison
// Why cleanup in useEffect? → Prevent memory leaks from running intervals
// Why spread operator in showToast? → Preserve existing toasts, add new one
// Why timestamp as key for removal? → Unique identifier for each toast
// Why fixed position? → Toast stays in same screen position when scrolling
// Why pointer-events? → Container non-clickable, but toasts are clickable
// Why template literal for className? → Dynamic positioning based on state
// filter returns new array → Immutability, keeps only matching items
// index as key in map → Simple approach when items don't reorder