// Inside ProgressBars.jsx, I will be maintaining all the logic for CONCURRENT progress bars

// Step 1: STATE MANAGEMENT

// useState declaration
// i) bars ---> empty array ([]) ---> holds array of progress bar objects with id and progress values

// Step 2: COMPONENT STRUCTURE

// I'll directly jump on the return JSX template

// i) main div with 'app-container' className
// ii) Inside main div we have Add button and mapped progress bars section
// iii) Add button with 'add-button' className calls addBar function on click
// iv) Progress bars container div with 'progress-bars-container' className
// v) Progress bars section maps through bars array to render each bar
// vi) Each progress bar has four-level structure:
//     - Wrapper div with 'progress-bar-wrapper' className
//     - Container div with 'progress-bar-container' className
//     - Fill div with 'progress-bar-fill' className and dynamic width
//     - Text div with 'progress-text' className showing percentage

// CORE LOGIC --> addBar function and useEffect hook
// i) addBar creates and adds new progress bar object to bars array
// ii) useEffect manages continuous animation timer for CONCURRENT progress updates

// for addBar -->
// i) create newBar object with two properties:
//     - id: Date.now() for unique identifier using current timestamp
//     - progress: 0 for starting progress percentage
// ii) use setBars with functional update: setBars((prev) => [...prev, newBar])
// iii) spread operator (...prev) maintains existing bars and adds newBar at end
// iv) new bar automatically gets picked up by animation timer

// for useEffect (CONCURRENT Animation Timer Logic) -->
// i) create setInterval that runs every 50ms for animation updates
// ii) inside interval callback: use setBars with functional update
// iii) check if prev.length === 0, if true return prev (no bars to update)
// iv) create newBars copy using spread operator: const newBars = [...prev]
// v) initialize concurrentCount = 0 to track how many bars we're updating
// vi) loop through bars array with for loop: for (let i = 0; i < newBars.length && concurrentCount < 3; i++)
// vii) for each bar: if progress < 100, increment by 1% and increment concurrentCount
// viii) continue until either all bars checked OR concurrentCount reaches 3
// ix) use Math.min(100, progress + 1) to prevent going over 100%
// x) return newBars to update state
// xi) return cleanup function: () => clearInterval(interval)

// CONCURRENT ANIMATION LOGIC:

// Multi-bar update loop (KEY DIFFERENCE from sequential)
let concurrentCount = 0;
for (let i = 0; i < newBars.length && concurrentCount < 3; i++) {
  if (newBars[i].progress < 100) {
    newBars[i].progress = Math.min(100, newBars[i].progress + 1);
    concurrentCount++;
  }
}

// i) concurrentCount tracks how many bars we're currently updating
// ii) loop continues until we've checked all bars OR updated 3 bars
// iii) && concurrentCount < 3 ensures maximum 3 bars fill simultaneously
// iv) only incomplete bars (progress < 100) get updated
// v) first 3 incomplete bars found will be the ones that get updated
// vi) maintains chronological order (earlier bars get priority)

// Progress increment calculation
// i) Timer interval: 50ms (every 50 milliseconds)
// ii) Target fill time: 5000ms per bar (50ms * 100 increments)
// iii) Total increments needed: 5000ms / 50ms = 100 increments
// iv) Progress per increment: 100% / 100 increments = 1% per increment
// v) Each bar takes exactly 5000ms to fill from 0% to 100%

// Concurrency limit enforcement
// i) Maximum 3 bars can be filling at any given time
// ii) 4th bar waits until 1st bar completes (reaches 100%)
// iii) 5th bar waits until 2nd bar completes
// iv) Creates a "sliding window" of active bars

// TIMER MANAGEMENT:

// useEffect with empty dependency array
// useEffect(() => { ... }, []);
// i) empty array [] means effect runs once on component mount
// ii) creates persistent timer that survives state updates
// iii) timer continues running regardless of bars array changes
// iv) cleanup function runs only on component unmount

// State update pattern
// setBars((prev) => { ... });
// i) functional update ensures we work with latest state
// ii) prevents stale closure issues with timer callbacks
// iii) prev parameter always contains current bars array
// iv) return value becomes new state

// VISUAL RENDERING SYSTEM:

// Dynamic width styling
// style={{ width: `${bar.progress}%` }}
// i) only property that remains inline (data-driven)
// ii) template literal converts number to percentage string
// iii) updates every 50ms as progress increments
// iv) CSS transition in external file handles smooth animation

// Progress text display
// {bar.progress}%
// i) shows current percentage as text below each bar
// ii) updates in real-time with progress value
// iii) provides accessibility and user feedback

// Key prop for React reconciliation
// key={bar.id}
// i) Date.now() timestamp ensures unique keys
// ii) helps React track individual progress bars
// iii) prevents rendering issues when bars are added/removed
// iv) maintains component state during re-renders

// STATE MANAGEMENT FLOW:

// Scenario: User adds 5 bars rapidly
// Time 0: bars = [{id: 1, progress: 0}] -> Bar 1 active (1/3 slots used)
// Time 50ms: bars = [{id: 1, progress: 1}] -> Bar 1 continues
// User adds 2nd bar: bars = [{id: 1, progress: X}, {id: 2, progress: 0}] -> Bars 1&2 active (2/3 slots)
// User adds 3rd bar: bars = [Bar1, Bar2, {id: 3, progress: 0}] -> Bars 1,2,3 active (3/3 slots FULL)
// User adds 4th bar: bars = [Bar1, Bar2, Bar3, {id: 4, progress: 0}] -> Bar 4 WAITS (still 3/3 slots)
// User adds 5th bar: bars = [Bar1, Bar2, Bar3, Bar4, {id: 5, progress: 0}] -> Bar 5 WAITS

// Time when Bar 1 completes (5000ms):
// bars = [{id: 1, progress: 100}, {id: 2, progress: X}, {id: 3, progress: X}, {id: 4, progress: 0}, {id: 5, progress: 0}]
// Now Bars 2,3,4 are active -> Bar 4 starts filling, Bar 5 still waits

// Time when Bar 2 completes:
// bars = [Bar1(100%), {id: 2, progress: 100}, Bar3(X%), Bar4(X%), {id: 5, progress: 0}]
// Now Bars 3,4,5 are active -> Bar 5 finally starts filling

// CONCURRENT BEHAVIOR GUARANTEE:

// Queue-like behavior with 3-slot limitation
// Example timeline with 6 bars added at once:
// Bars 1,2,3: Start immediately (fill concurrently)
// Bar 4: Starts when Bar 1 completes
// Bar 5: Starts when Bar 2 completes
// Bar 6: Starts when Bar 3 completes

// Active slots management:
// i) Always maintain exactly 3 active bars (unless fewer than 3 total)
// ii) As soon as one bar completes, next waiting bar starts immediately
// iii) Chronological order preserved (first added = first priority)
// iv) No gaps in animation (smooth transition from completed to waiting bars)

// ANIMATION TIMING SYNCHRONIZATION:

// All active bars progress at same rate
// i) Every 50ms, all active bars increment by 1%
// ii) Bars started at same time will finish at same time
// iii) New bars inherit the timing rhythm of existing animation
// iv) No visual stuttering or timing conflicts

// EDGE CASES HANDLED:

// Empty state: if (prev.length === 0) return prev
// i) Prevents unnecessary processing when no bars exist
// ii) Timer continues running but does nothing

// Completion bounds: Math.min(100, progress + 1)
// i) Ensures progress never exceeds 100%
// ii) Prevents visual overflow or calculation errors

// Loop termination: && concurrentCount < 3
// i) Prevents updating more than 3 bars per cycle
// ii) Maintains strict concurrency limit

// CSS INTEGRATION:

// External CSS classes handle all styling
// i) .app-container -> main layout, background, padding
// ii) .add-button -> button styling, hover effects, focus states
// iii) .progress-bars-container -> flex layout, spacing between bars
// iv) .progress-bar-wrapper -> individual bar container, max width
// v) .progress-bar-container -> gray background, rounded corners, shadow
// vi) .progress-bar-fill -> green gradient, smooth transitions, animations
// vii) .progress-text -> percentage text styling, alignment

// Component separation of concerns:
// i) JavaScript handles data and business logic only
// ii) CSS handles all visual presentation and animations
// iii) Inline styles used only for dynamic data (width percentage)
// iv) Clean separation enables easy styling changes without logic changes

// PERFORMANCE CONSIDERATIONS:

// Efficient state updates
// i) Single setBars call per timer cycle (not per bar)
// ii) Batch processing of multiple bar updates
// iii) Minimal array copying with spread operator

// Timer optimization
// i) Single timer for all bars (not one timer per bar)
// ii) 50ms interval balances smoothness with performance
// iii) Early return for empty state saves unnecessary processing

// React rendering optimization
// i) Stable key props prevent unnecessary re-renders
// ii) Functional state updates prevent stale closures
// iii) Minimal inline styles reduce render complexity
