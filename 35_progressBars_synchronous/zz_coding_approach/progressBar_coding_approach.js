
// Inside ProgressBars.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) bars ---> empty array ([]) ---> holds array of progress bar objects with id and progress values

// Step 2:

// I'll directly jump on the return JSX template

// i) main div with 'app-container' className
// ii) Inside main div we have Add button and mapped progress bars section
// iii) Add button with 'add-button' className calls addBar function on click
// iv) Progress bars section maps through bars array to render each bar
// v) Each progress bar has three-level structure:
//     - Wrapper div with 'progress-bar-wrapper' className
//     - Container div with 'progress-bar-container' className
//     - Fill div with 'progress-bar-fill' className and dynamic width


// CORE LOGIC --> addBar function and useEffect hook
// i) addBar creates and adds new progress bar object to bars array
// ii) useEffect manages continuous animation timer for sequential progress updates

// for addBar -->
// i) create newBar object with two properties:
//     - id: Date.now() for unique identifier using current timestamp
//     - progress: 0 for starting progress percentage
// ii) use setBars with functional update: setBars((prev) => [...prev, newBar])
// iii) spread operator (...prev) maintains existing bars and adds newBar at end
// iv) new bar automatically gets picked up by animation timer

// for useEffect (Animation Timer Logic) -->
// i) create setInterval that runs every 50ms for animation updates
// ii) inside interval callback: use setBars with functional update
// iii) check if prev.length === 0, if true return prev (no bars to update)
// iv) create newBars copy using spread operator: const newBars = [...prev]
// v) find first incomplete bar using findIndex: activeBarIndex = newBars.findIndex((bar) => bar.progress < 100)
// vi) if activeBarIndex !== -1: increment that bar's progress by 1%
// vii) use Math.min(100, progress + 1) to prevent going over 100%
// viii) return newBars to update state
// ix) return cleanup function: () => clearInterval(interval)

// SEQUENTIAL ANIMATION LOGIC:

// Finding active bar for animation
const activeBarIndex = newBars.findIndex((bar) => bar.progress < 100);
// i) findIndex searches array from beginning (index 0)
// ii) returns index of FIRST element that matches condition
// iii) condition: bar.progress < 100 (bar not yet complete)
// iv) ensures bars fill in chronological order (first added = first filled)
// v) returns -1 if no bars match (all bars complete)

// Progress increment calculation
// i) Timer interval: 50ms (every 50 milliseconds)
// ii) Target fill time: 2000ms per bar
// iii) Total increments needed: 2000ms / 50ms = 40 increments
// iv) Progress per increment: 100% / 40 increments = 2.5% per increment
// v) NOTE: Code shows 1% increment, so actual time = 50ms * 100 = 5000ms per bar

// Progress update with bounds checking
newBars[activeBarIndex].progress = Math.min(100, newBars[activeBarIndex].progress + 1);
// i) Math.min ensures progress never exceeds 100%
// ii) activeBarIndex points to specific bar object in array
// iii) directly mutate progress property of copied array
// iv) 1% increment moves progress from 0% to 100% in 100 steps

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

// Key prop for React reconciliation
// key={bar.id}
// i) Date.now() timestamp ensures unique keys
// ii) helps React track individual progress bars
// iii) prevents rendering issues when bars are added/removed
// iv) maintains component state during re-renders

// STATE MANAGEMENT FLOW:

// Initial state: bars = []
// User clicks Add -> addBar() -> bars = [{id: 1234, progress: 0}]
// Timer starts: finds bars[0] with progress < 100
// After 50ms: bars[0].progress = 1%
// After 100ms: bars[0].progress = 2%
// ...continues until bars[0].progress = 100%
// User clicks Add again -> bars = [{id: 1234, progress: 100}, {id: 5678, progress: 0}]
// Timer now finds bars[1] as first incomplete bar
// Process repeats for second bar while first bar stays at 100%

// SEQUENTIAL BEHAVIOR GUARANTEE:

// Example with 3 bars added at different times:
// Time 0: bars = [{id: 1, progress: 0}] -> Bar 1 active
// Time 5000ms: bars = [{id: 1, progress: 100}] -> Bar 1 complete
// Time 5050ms: User adds bar -> bars = [{id: 1, progress: 100}, {id: 2, progress: 0}] -> Bar 2 active
// Time 10000ms: bars = [{id: 1, progress: 100}, {id: 2, progress: 100}] -> Bar 2 complete
// Time 10050ms: User adds bar -> bars = [..., {id: 3, progress: 0}] -> Bar 3 active

// CSS INTEGRATION:

// External CSS classes handle all styling
// i) .app-container -> main layout and spacing
// ii) .add-button -> button appearance and hover effects
// iii) .progress-bar-wrapper -> spacing between progress bars
// iv) .progress-bar-container -> gray background container styling
// v) .progress-bar-fill -> green fill color and smooth transitions

// Component only handles:
// i) Data management (bars array)
// ii) Business logic (sequential filling)
// iii) Dynamic content (progress percentage)
// iv) User interactions (button clicks)