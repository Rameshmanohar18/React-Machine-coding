// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Progressbar /> component
// Progressbar.jsx → contains all progress bar logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: filled → useState(0)
// → Tracks progress percentage (0 to 100)
// → Starts at 0

// State 2: isRunning → useState(false)
// → Tracks if progress bar is currently running
// → Starts as false (not running)

// State 3: timeoutId → useState(null)
// → Stores setTimeout id for cleanup
// → Needed to clear timeout when stopping/resetting

// ============================================
// useEffect: PROGRESS INCREMENT LOGIC
// ============================================

// Dependency array: [filled, isRunning]
// → Runs whenever filled or isRunning changes

// CONDITION 1: if (filled < 100 && isRunning)
// → Progress bar is running and hasn't reached 100%

// Inside this condition:
// → Create setTimeout that increments filled by 25 after 250ms
// → const id = setTimeout(() => setFilled((prev) => prev + 25), 250)
// → Store timeout id: setTimeoutId(id)
// → Why prev callback? Access most current state safely

// CONDITION 2: else if (filled === 100)
// → Progress reached 100%
// → setIsRunning(false) to stop the progress
// → Automatically stops when complete

// Cleanup function:
// → return () => clearTimeout(timeoutId)
// → Clears timeout when component unmounts or dependencies change
// → Prevents memory leaks and multiple timers

// ============================================
// BUTTON HANDLERS
// ============================================

// handleStart function:
// → Simply: setIsRunning(true)
// → Triggers useEffect to start incrementing

// handleStop function:
// → Simply: setIsRunning(false)
// → Stops useEffect from creating new timeouts
// → Progress stays at current value

// handleReset function:
// → clearTimeout(timeoutId) → stops any running timeout
// → setFilled(0) → resets progress to 0%
// → setIsRunning(false) → ensures stopped state

// ============================================
// JSX STRUCTURE - PROGRESS BAR DISPLAY
// ============================================

// Two main sections: progress bar + buttons

// SECTION 1: Progress Bar
// → Outer div with className 'progressbar' (container/background)
// → Inner div with className 'progressbar-filled' (colored fill)
// → Span with className 'progressPercent' (text showing percentage)

// Inner div (filled portion):
// → Dynamic inline style: style={{ width: `${filled}%` }}
// → Example: filled = 50 → width: "50%"
// → CSS transition on width creates smooth animation

// Span (percentage text):
// → Display: {filled}%
// → Shows current progress as text overlay

// ============================================
// JSX STRUCTURE - BUTTONS
// ============================================

// SECTION 2: Buttons container
// → Wrap all buttons in div with className 'playBtns'

// Start button:
// → onClick={handleStart}
// → disabled={isRunning || filled === 100}
// → Disabled when: already running OR already complete

// Stop button:
// → onClick={handleStop}
// → disabled={!isRunning}
// → Disabled when: not running (can't stop if not started)

// Reset button:
// → onClick={handleReset}
// → No disabled condition (can always reset)

// ============================================
// CSS APPROACH
// ============================================

// .progressbar (outer container):
// → position: relative (for absolute positioning of inner elements)
// → width: 100% or fixed width
// → height: ~30px
// → background-color: light gray (unfilled area)
// → border-radius: for rounded corners
// → overflow: hidden (keeps inner div within bounds)

// .progressbar-filled (inner filled bar):
// → position: absolute or relative
// → height: 100% (matches parent height)
// → background-color: blue/green (filled color)
// → transition: width 0.25s ease (smooth width animation)
// → Why transition? Makes progress increase smoothly

// .progressPercent (text overlay):
// → position: absolute
// → Center it: top: 50%, left: 50%, transform: translate(-50%, -50%)
// → color: white or contrasting color
// → z-index: 1 (appears above filled bar)
// → font-weight: bold for visibility

// .playBtns (button container):
// → display: flex
// → justify-content: center or space-around
// → margin-top: spacing from progress bar
// → gap: spacing between buttons

// Button styling:
// → Padding, border-radius for appearance
// → disabled:opacity or disabled:cursor for disabled state
// → Hover effects for better UX

// ============================================
// PROGRESS BAR FLOW
// ============================================

// Initial state:
// → filled = 0, isRunning = false
// → Progress bar shows 0% (no filled portion)
// → Start button enabled, Stop/Reset buttons disabled

// User clicks Start:
// → handleStart runs
// → setIsRunning(true)
// → useEffect triggers (isRunning changed)
// → Condition: 0 < 100 && true → creates setTimeout
// → After 250ms: setFilled(0 + 25) → filled becomes 25
// → Start button disabled, Stop button enabled

// Progress continues:
// → filled = 25, isRunning = true
// → useEffect runs again (filled changed)
// → Creates new setTimeout
// → After 250ms: filled becomes 50
// → Cycle repeats: 0 → 25 → 50 → 75 → 100

// Reaches 100%:
// → filled = 100, isRunning = true
// → useEffect runs
// → First condition false (filled not < 100)
// → Second condition true (filled === 100)
// → setIsRunning(false) → automatically stops
// → Start button disabled (filled === 100)
// → Stop button disabled (!isRunning)
// → Only Reset button available

// User clicks Stop (before 100%):
// → handleStop runs
// → setIsRunning(false)
// → useEffect cleanup clears current timeout
// → No new timeouts created (isRunning is false)
// → Progress frozen at current value
// → Can click Start to resume

// User clicks Reset:
// → handleReset runs
// → clearTimeout(timeoutId) → stops any running timeout
// → setFilled(0) → progress back to 0%
// → setIsRunning(false) → ensures stopped
// → Back to initial state

// ============================================
// KEY CONCEPTS
// ============================================

// Why setTimeout not setInterval? → More control, prevents overlap
// Why store timeoutId in state? → Need reference for clearTimeout
// Why cleanup in useEffect? → Clear timeout when dependencies change
// Why prev in setFilled? → Avoid stale state in async operations
// Why disable buttons? → Prevent invalid actions (can't start if running)
// Why check filled === 100? → Auto-stop when complete
// Why inline style for width? → Dynamic value based on state
// Why transition in CSS? → Smooth visual animation as width changes
// filled + 25 every 250ms → 0 to 100 in 1 second (4 steps × 250ms)
// Dynamic width % → CSS automatically animates the width change
// Position relative + absolute → Stack text over progress bar