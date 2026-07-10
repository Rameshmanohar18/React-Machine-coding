// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <AnalogClock />

// AnalogClock.jsx → main component that renders 3 ClockHand components
// ClockHand.jsx → individual hand (hour/minute/second) with rotation
// useClockHandDegrees.js → custom hook for time calculations

// ============================================
// CUSTOM HOOK: useClockHandDegrees
// ============================================

// State: Track current time
// useState(new Date()) → initializes with current time

// ============================================
// useEffect: Real-time Clock Updates
// ============================================

// Setup setInterval to update time every 1000ms (1 second)
// setInterval(() => setTime(new Date()), 1000)

// Cleanup: Clear interval when component unmounts
// return () => clearInterval(timerId)

// Dependency array: [] empty because we only want to set up interval once

// ============================================
// DEGREE CALCULATION LOGIC
// ============================================

// Helper function: getDegrees(unit, maxUnits)
// Formula: (unit / maxUnits) * 360 + 90

// Why divide by maxUnits? → converts to fraction (0-1 range)
// Why multiply by 360? → full circle rotation
// Why add 90? → CSS rotation starts at 3 o'clock, we want 12 o'clock

// Example: 15 seconds → (15/60) * 360 + 90 = 90 + 90 = 180 degrees

// ============================================
// CALCULATE DEGREES FOR EACH HAND
// ============================================

// Seconds: getDegrees(time.getSeconds(), 60)
// → Max 60 seconds in a minute

// Minutes: getDegrees(time.getMinutes(), 60)
// → Max 60 minutes in an hour

// Hours: getDegrees(time.getHours(), 12)
// → Max 12 hours on clock face (not 24)

// Return object: { secondsDegrees, minsDegrees, hourDegrees }

// ============================================
// ANALOGCLOCK.JSX - MAIN COMPONENT
// ============================================

// Destructure hook return values
// const { secondsDegrees, minsDegrees, hourDegrees } = useClockHandDegrees()

// Render 3 ClockHand components:
// → Each with unique type prop ('hour-hand', 'min-hand', 'second-hand')
// → Each with corresponding degrees prop

// ============================================
// CLOCKHAND.JSX - CHILD COMPONENT
// ============================================

// Props: { type, degrees }

// type → used for className (styling differences for each hand)
// degrees → used for inline style transform

// Inline style: style={{ transform: `rotate(${degrees}deg)` }}
// This rotates the hand div based on calculated degrees

// className: `hand ${type}` → base class + specific type class

// ============================================
// LOGIC FLOW
// ============================================

// Initial render:
// → useClockHandDegrees hook runs
// → Gets current time via new Date()
// → Calculates degrees for all 3 hands
// → AnalogClock renders 3 ClockHand components with degrees
// → Each hand rotates to correct position

// Every second (interval tick):
// → setTime(new Date()) updates time state
// → Hook recalculates degrees for all hands
// → Component re-renders
// → Hands rotate to new positions

// Component unmount:
// → Cleanup function clears interval
// → Prevents memory leak

// ============================================
// KEY CONCEPTS
// ============================================

// Why custom hook? → Separates time logic from UI rendering
// Why interval? → Real-time updates every second
// Why cleanup? → Prevent memory leaks and multiple intervals
// Why +90 in formula? → Adjust for CSS rotation starting point
// Why transform rotate? → CSS property for rotating elements
// getSeconds()/getMinutes()/getHours() → Built-in Date methods


// ----

// PART-2: CSS (mandatory for this challenge) as it is UI heavy and relied on styling

// Step 1: AnalogClock.jsx has a main div with className as "clock"

// Styling classes: width:400px, height:400px, position:relative, border-radius:50%,

// Step 3: ClockHand.jsx has both className and style for a single div with a className as `hand ${second-hand}` as ex:

// Styling classes: For hand: background: black, height:6px, position: absolute, top: 50%, transform-origin: 100%,

// Styling classes: hour-hand, min-hand, second-hand (has width and right), with right as constant (Ex: right: 50%) and width varies from 30% for hour-hand and 40% for min-hand and 45% for second-hand

// make sure to add a inline style which holds transform: rotate(degrees)deg
