// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains entire stopwatch logic (no separate components)

// ============================================
// REF VARIABLES (useRef)
// ============================================

// Ref 1: animationFrameRef → useRef(0)
// → Stores requestAnimationFrame ID
// → Needed to cancel animation when stopping/resetting
// → Persists across re-renders without causing re-renders

// Ref 2: lastTimer → useRef(Date.now())
// → Stores timestamp when timer last started/reset
// → Used to calculate elapsed time
// → Initial value: current timestamp in milliseconds

// Why useRef instead of useState?
// → Changing ref doesn't trigger re-render
// → Animation frame ID doesn't need to cause UI updates
// → Timestamp reference should persist but not re-render

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: timerString → useState(['00', '00', '00'])
// → Array with 3 elements: [minutes, seconds, milliseconds]
// → Format: ['00', '00', '00'] displays as 00:00:00
// → Updates every animation frame when running

// State 2: isTimerRunning → useState(false)
// → Boolean tracking if stopwatch is active
// → Controls button disabled states
// → Starts as false (stopped)

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'watch-container'

// Inner div with className 'watch'

// Inside watch div, 3 sections:

// SECTION 1: Heading
// → div with className 'watch-heading'
// → Text: "Stopwatch"

// SECTION 2: Timer Display
// → div with className 'watch-timer'
// → Template literal: `${timerString[0]}:${timerString[1]}:${timerString[2]}`
// → Example display: "02:45:123" (2 min, 45 sec, 123 ms)

// SECTION 3: Buttons Container
// → div with className 'watch-btn__container'

// Button 1 - Start:
// → onClick={onStart}
// → disabled={isTimerRunning} → disabled when already running
// → className='watch-btn'
// → Text: "Start"

// Button 2 - Stop:
// → onClick={onStop}
// → disabled={!isTimerRunning} → disabled when not running
// → className='watch-btn'
// → Text: "Stop"

// Button 3 - Reset:
// → onClick={onReset}
// → No disabled condition (always clickable)
// → className='watch-btn'
// → Text: "Reset"

// ============================================
// ONSTART FUNCTION
// ============================================

// Purpose: Start the stopwatch timer

// STEP 1: Set running state to true
// → setIsTimerRunning(true)

// STEP 2: Start animation loop
// → animationFrameRef.current = requestAnimationFrame(timerFn)
// → requestAnimationFrame calls timerFn before next repaint
// → Stores frame ID in ref for later cancellation

// ============================================
// ONSTOP FUNCTION
// ============================================

// Purpose: Pause the stopwatch timer

// STEP 1: Set running state to false
// → setIsTimerRunning(false)

// STEP 2: Cancel animation loop
// → cancelAnimationFrame(animationFrameRef.current)
// → Stops timerFn from being called
// → Timer pauses at current value

// ============================================
// ONRESET FUNCTION
// ============================================

// Purpose: Reset stopwatch to 00:00:00

// STEP 1: Set running state to false
// → setIsTimerRunning(false)

// STEP 2: Reset timer display
// → updateTime(['00', '00', '00'])
// → Back to initial state

// STEP 3: Cancel animation loop
// → cancelAnimationFrame(animationFrameRef.current)
// → Stops any running animation

// STEP 4: Reset timestamp reference
// → lastTimer.current = Date.now()
// → Sets new starting point for next run
// → Ensures timer starts from 0 when started again

// ============================================
// timerFn FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Calculate and update elapsed time

// Called by: requestAnimationFrame (runs every frame ~60fps)

// STEP 1: Calculate milliseconds elapsed
// → const milliSecondElapsed = Date.now() - lastTimer.current
// → Date.now() = current timestamp
// → lastTimer.current = timestamp when timer started/reset
// → Result: milliseconds since start

// Example:
// → lastTimer.current = 1634567890000
// → Date.now() = 1634567895123
// → milliSecondElapsed = 5123ms (5.123 seconds)

// STEP 2: Calculate seconds elapsed
// → const secondsElapsed = Math.floor(milliSecondElapsed / 1000)
// → Divide by 1000 to convert ms to seconds
// → Math.floor removes decimal part
// → Example: 5123 / 1000 = 5.123 → Math.floor = 5 seconds

// STEP 3: Calculate minutes elapsed
// → const minutesElapsed = Math.floor(secondsElapsed / 60)
// → Divide seconds by 60 to get minutes
// → Math.floor removes decimal part
// → Example: 125 / 60 = 2.083 → Math.floor = 2 minutes

// STEP 4: Format milliseconds for display
// → const milliSeconds = (milliSecondElapsed % 1000).toString().padStart(3, '0')

// Breaking down the logic:
// → milliSecondElapsed % 1000 → gets remainder (last 3 digits)
// → Example: 5123 % 1000 = 123
// → .toString() → converts to string
// → .padStart(3, '0') → pads with leading zeros if less than 3 digits
// → Example: 23 → "023", 5 → "005"

// STEP 5: Format seconds for display
// → const seconds = (secondsElapsed % 60).toString().padStart(2, '0')

// Breaking down:
// → secondsElapsed % 60 → gets remainder (seconds within current minute)
// → Example: 125 % 60 = 5 (2 minutes and 5 seconds)
// → .padStart(2, '0') → ensures 2 digits
// → Example: 5 → "05", 45 → "45"

// STEP 6: Format minutes for display
// → const minutes = minutesElapsed.toString().padStart(2, '0')

// Breaking down:
// → Use minutesElapsed directly (no modulo needed for display)
// → .padStart(2, '0') → ensures 2 digits
// → Example: 2 → "02", 15 → "15"

// STEP 7: Update timer display
// → updateTime([minutes, seconds, milliSeconds])
// → Sets state with formatted time array
// → Triggers re-render to show new time

// STEP 8: Request next animation frame
// → animationFrameRef.current = requestAnimationFrame(timerFn)
// → Creates loop by calling timerFn again
// → Runs before next browser repaint (~60fps)

// ============================================
// useEffect: CLEANUP ON UNMOUNT
// ============================================

// Dependency array: [] (empty, runs once on mount)

// Cleanup function:
// → return () => cancelAnimationFrame(animationFrameRef.current)
// → Runs when component unmounts
// → Cancels any running animation
// → Prevents memory leaks

// ============================================
// STOPWATCH FLOW
// ============================================

// Initial state:
// → timerString = ['00', '00', '00']
// → isTimerRunning = false
// → Display shows: "00:00:00"
// → Start button enabled, Stop button disabled

// User clicks Start button:
// → onStart() called
// → setIsTimerRunning(true)
// → Start button disabled, Stop button enabled
// → requestAnimationFrame(timerFn) starts loop
// → lastTimer.current already set (from initial or last reset)

// First timerFn execution:
// → Date.now() - lastTimer.current = small number (few ms)
// → Calculates: milliSecondElapsed, secondsElapsed, minutesElapsed
// → Formats all three values with padding
// → updateTime updates state
// → Display shows: "00:00:016" (example: 16ms)
// → Requests next frame

// Subsequent frames (every ~16ms at 60fps):
// → timerFn keeps running
// → Elapsed time increases
// → Display updates: "00:00:123" → "00:01:456" → "00:15:789"
// → Pattern continues until stopped

// After 1 minute 25 seconds:
// → milliSecondElapsed = 85123ms
// → secondsElapsed = Math.floor(85123/1000) = 85
// → minutesElapsed = Math.floor(85/60) = 1
// → milliSeconds = 85123 % 1000 = 123 → "123"
// → seconds = 85 % 60 = 25 → "25"
// → minutes = 1 → "01"
// → Display shows: "01:25:123"

// User clicks Stop button:
// → onStop() called
// → setIsTimerRunning(false)
// → Stop button disabled, Start button enabled
// → cancelAnimationFrame stops loop
// → Timer pauses at current value (e.g., "01:25:123")
// → lastTimer.current unchanged (keeps reference)

// User clicks Start again (resume):
// → onStart() called
// → But lastTimer.current still has old timestamp
// → Timer continues from paused value
// → Example: Was at 01:25:123, continues to 01:25:456...

// User clicks Reset button:
// → onReset() called
// → setIsTimerRunning(false)
// → updateTime(['00', '00', '00']) → display shows "00:00:00"
// → cancelAnimationFrame stops any running animation
// → lastTimer.current = Date.now() → new reference point
// → Next start begins from 00:00:00

// ============================================
// CSS APPROACH
// ============================================

// .watch-container:
// → Center the stopwatch on page
// → display: flex, justify-content: center, align-items: center
// → min-height: 100vh (full viewport height)

// .watch:
// → Background, border, border-radius for card appearance
// → Padding for internal spacing
// → Box shadow for depth

// .watch-heading:
// → Font size, weight for title
// → Text alignment, margin for spacing

// .watch-timer:
// → Large font size (40px+) for visibility
// → Monospace font family for aligned digits
// → Text alignment center
// → Margin for spacing
// → Letter spacing for readability

// .watch-btn__container:
// → display: flex
// → justify-content: space-around or gap for spacing
// → margin-top for separation from timer

// .watch-btn:
// → Padding, font-size for button size
// → Border, border-radius for appearance
// → cursor: pointer
// → Background color, hover effects
// → disabled:opacity for disabled state
// → disabled:cursor: not-allowed

// ============================================
// KEY CONCEPTS
// ============================================

// Why requestAnimationFrame? → Smooth 60fps updates, browser-optimized
// Why useRef for animationFrameRef? → Persist ID without re-renders
// Why useRef for lastTimer? → Timestamp reference, no re-renders needed
// Why Date.now()? → Current timestamp in milliseconds
// Why subtract timestamps? → Calculate elapsed time
// Why Math.floor? → Remove decimals, get whole numbers
// Why modulo (%)? → Get remainder (seconds in minute, ms in second)
// Why padStart? → Ensure consistent digit count (05 not 5)
// Why array for timerString? → Separate storage of min, sec, ms
// Why cancelAnimationFrame? → Stop animation loop, prevent memory leaks
// Why cleanup in useEffect? → Cancel on unmount, avoid leaks
// requestAnimationFrame creates loop → Each call requests next call
// 60fps = ~16ms between frames → Very smooth timer updates
// padStart(2, '0') → "5" becomes "05", "45" stays "45"
// padStart(3, '0') → "5" becomes "005", "123" stays "123"