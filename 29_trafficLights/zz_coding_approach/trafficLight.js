// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: light → useState('red')
// → Current active light color
// → Values: 'red', 'yellow', 'green'

// State 2: isPaused → useState(false)
// → Controls whether timer is paused
// → true: timer stops, false: timer runs

// ============================================
// FUNCTION LOGIC
// ============================================

// onReset():
// → setLight('red') - reset to red
// → setIsPaused(true) - pause the timer

// togglePause():
// → setIsPaused((prev) => !prev)
// → Toggles between paused and running

// ============================================
// useEffect - TIMER LOGIC
// ============================================

// Dependencies: [light, isPaused]
// → Runs when light changes or isPaused changes

// Logic:
// → if (isPaused) return - exit early if paused
// → setTimeout after 1000ms (1 second):
//   - if (light === 'red') → setLight('yellow')
//   - else if (light === 'yellow') → setLight('green')
//   - else if (light === 'green') → setLight('red')
// → Cleanup: return () => clearTimeout(timer)

// Cycle: red → yellow → green → red (repeats)

// ============================================
// JSX STRUCTURE
// ============================================

// Traffic light container:
// → Three light divs (red, yellow, green)
// → Each with dynamic className:
//   - className={`light red ${light === 'red' ? 'on' : ''}`}
//   - Adds 'on' class when active

// Control buttons:
// → Pause/Resume button:
//   - onClick={togglePause}
//   - Text: {isPaused ? 'Resume' : 'Pause'}
// → Reset button:
//   - onClick={onReset}
//   - Text: 'Reset'

// ============================================
// KEY CONCEPTS
// ============================================

// setTimeout → Delay state change by 1000ms
// clearTimeout in cleanup → Prevent memory leaks
// Early return → if (isPaused) return stops timer
// Cyclic state transitions → red → yellow → green → red
// Conditional className → Add 'on' class to active light
// Functional setState → setIsPaused((prev) => !prev) for toggle
// useEffect cleanup → Clear timer on unmount or dependency change
// Dependencies trigger → light change restarts timer for next transition