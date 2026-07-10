// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Timer /> component
// Timer.jsx → contains entire countdown timer logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: hour → useState(0)
// State 2: minute → useState(0)
// State 3: second → useState(0)
// State 4: IsTimerActive → useState(false) → tracks if timer is running
// State 5: message → useState('') → error message if no values provided

// ============================================
// SIMPLE BUTTON HANDLERS
// ============================================

// startTimer function:
// → Check if all values are 0 (hour === 0 && minute === 0 && second === 0)
// → If yes: setMessage('Please provide some value for the timer.')
// → If no: setIsTimerActive(true) and setMessage('') to clear any message

// pauseTimer function:
// → Simply setIsTimerActive(false)

// resetTimer function:
// → Reset all states to default
// → setHour(0), setMinute(0), setSecond(0), setIsTimerActive(false)

// ============================================
// HELPER FUNCTION: formatTime
// ============================================

// Purpose: Display single digit numbers with leading zero
// Logic: time < 10 ? `0${time}` : `${time}`
// Example: 5 becomes "05", 15 stays "15"

// ============================================
// CORE LOGIC: useEffect for Timer
// ============================================

// Dependency array: [IsTimerActive, hour, minute, second]
// Runs whenever any of these values change

// STEP 1: Declare interval variable
// let interval = null

// STEP 2: Check if timer should run
// Condition: IsTimerActive && (hour > 0 || minute > 0 || second > 0)

// STEP 3: If condition true, start setInterval
// interval = setInterval(() => { /* logic */ }, 1000)

// ============================================
// COUNTDOWN LOGIC (Inside setInterval)
// ============================================

// Three conditions using if, else if, else if:

// CONDITION 1: if (second > 0)
// → Decrement seconds: setSecond((seconds) => seconds - 1)
// → Runs until seconds reach 0

// CONDITION 2: else if (minute > 0)
// → Decrement minutes: setMinute((minutes) => minutes - 1)
// → Reset seconds: setSecond(59)
// → This runs when seconds hit 0 but minutes remain

// CONDITION 3: else if (hour > 0)
// → Decrement hours: setHour((hours) => hours - 1)
// → Reset minutes: setMinute(59)
// → Reset seconds: setSecond(59)
// → This runs when both seconds and minutes hit 0 but hours remain

// ============================================
// PAUSE LOGIC (Inside useEffect)
// ============================================

// else if (!IsTimerActive && interval !== null)
// → Timer was paused but interval still exists
// → clearInterval(interval) to stop countdown

// ============================================
// CLEANUP (Inside useEffect)
// ============================================

// return () => clearInterval(interval)
// → Clears interval when component unmounts or dependencies change
// → Prevents memory leaks

// ============================================
// INPUT onChange LOGIC (TRICKY PART)
// ============================================

// Goal: Restrict user input to valid ranges

// Pattern: Math.max(0, Math.min(maxValue, parseInt(e.target.value)))

// Why this pattern?
// → Math.min ensures value doesn't exceed maximum
// → Math.max ensures value doesn't go below 0
// → parseInt converts string input to number

// HOUR input:
// → Math.max(0, Math.min(23, parseInt(e.target.value)))
// → If user types 24 → Math.min picks 23 (minimum of 24 and 23)
// → If user types -5 → Math.max picks 0 (maximum of 0 and -5)

// MINUTE input:
// → Math.max(0, Math.min(59, parseInt(e.target.value)))
// → If user types 60 → Math.min picks 59
// → If user types -1 → Math.max picks 0

// SECOND input:
// → Same pattern as minute
// → Math.max(0, Math.min(59, parseInt(e.target.value)))

// ============================================
// JSX STRUCTURE
// ============================================

// Divided into 3 main sections:

// SECTION 1: Inputs container
// → 3 input fields (hour, minute, second)
// → Each separated by colon (:)
// → value={formatTime(hour/minute/second)} for display
// → onChange with Math.max/Math.min validation

// SECTION 2: Buttons container
// → Conditional rendering for Start/Pause button
// → Logic: {!IsTimerActive ? <Start button> : <Pause button>}
// → Reset button always visible

// SECTION 3: Message display (optional)
// → Conditional rendering: {message && <div>{message}</div>}
// → Only shows when message state has value

// ============================================
// LOGIC FLOW
// ============================================

// Initial state:
// → All time values at 0
// → Timer inactive
// → No message

// User enters values (e.g., 00:01:30):
// → onChange handlers validate and set states
// → Math.max/Math.min ensures valid ranges

// Click Start button:
// → startTimer checks if any value > 0
// → If no values: show error message
// → If values exist: setIsTimerActive(true), clear message
// → useEffect triggers → starts setInterval

// Timer running (every 1 second):
// → Checks second > 0 → decrements
// → If second hits 0 and minute > 0 → decrements minute, resets second to 59
// → If both second and minute hit 0 and hour > 0 → decrements hour, resets both to 59
// → Continues until all values reach 0

// Click Pause button:
// → setIsTimerActive(false)
// → useEffect cleanup clears interval
// → Timer stops at current values

// Click Start again (resume):
// → setIsTimerActive(true)
// → useEffect starts new interval
// → Continues from paused values

// Click Reset button:
// → All states reset to 0
// → Timer becomes inactive

// ============================================
// KEY CONCEPTS
// ============================================

// Why useEffect dependencies? → Re-run logic when timer state changes
// Why setInterval? → Execute countdown logic every 1000ms (1 second)
// Why cleanup function? → Prevent multiple intervals and memory leaks
// Why Math.max(0, Math.min(max, value))? → Clamp input within valid range
// Why formatTime? → Display consistency (00:05:30 vs 0:5:30)
// Why conditional button rendering? → Toggle between Start/Pause based on state
// Why check all values in startTimer? → Prevent starting empty timer
// Countdown order priority: seconds → minutes → hours (most frequent to least)
