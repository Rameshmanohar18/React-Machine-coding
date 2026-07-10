// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all logic (Context setup + UI)
// No separate child components needed for basic theme toggle

// ============================================
// CONTEXT API SETUP
// ============================================

// Create context outside component:
// → export const ThemeContext = createContext(null)
// → null is default value (when no Provider exists)
// → Export for potential use in other components

// ============================================
// STATE MANAGEMENT
// ============================================

// State: currentTheme → useState('dark')
// → Tracks current theme ('dark' or 'light')
// → Default: 'dark'

// ============================================
// TOGGLE FUNCTION
// ============================================

// toggleTheme function:
// → Uses setState with callback: (theme) => ...
// → Ternary logic: theme === 'dark' ? 'light' : 'dark'
// → Switches between two themes

// ============================================
// CONTEXT PROVIDER WRAPPER
// ============================================

// Wrap entire app in ThemeContext.Provider:
// → <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
// → value prop contains object with:
//   - currentTheme: current state value
//   - toggleTheme: function to change theme
// → Any child component can access these via useContext

// ============================================
// JSX STRUCTURE
// ============================================

// Main div:
// → className='App' → for centering content
// → id={currentTheme} → dynamic id based on state ('dark' or 'light')
// → Why id? Makes CSS targeting easier for theme-specific styles

// Switch container div:
// → Wraps label and button together

// Label element:
// → Conditional text: {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
// → Shows current mode name

// Button element:
// → onClick={toggleTheme} → triggers theme switch
// → className with template literal for dynamic class:
//   `switch-button ${currentTheme === 'dark' ? 'switch-button-on' : ''}`
// → Base class: 'switch-button' (always present)
// → Conditional class: 'switch-button-on' (only when dark mode)

// Span inside button:
// → <span className='slider'></span>
// → This is the circular ball that slides
// → No text inside button, only the slider span

// ============================================
// CSS APPROACH - THEME COLORS
// ============================================

// .App class:
// → Center content: display flex, justify-content/align-items center
// → Set minimum height (viewport height)

// Theme-specific styling using id selector:
// → #light { background-color: lightgray; }
// → #dark { background-color: black; }
// → Why id? Direct targeting based on currentTheme state

// Label color based on theme:
// → #light label { color: dark-color; }
// → #dark label { color: light-color; }
// → Ensures text is readable on both backgrounds

// ============================================
// CSS APPROACH - TOGGLE BUTTON (CORE UI)
// ============================================

// .switch-button (base styles - the track/background):
// → position: relative → allows absolute positioning of slider inside
// → width: ~60px, height: ~30px → size of the toggle track
// → background-color: gray → track background
// → border-radius: 15px (half of height) → rounded pill shape
// → cursor: pointer → indicates clickable

// .slider (the ball that moves):
// → position: absolute → positioned relative to .switch-button
// → top: 2px, left: 2px → small padding from edges
// → width: ~26px, height: ~26px → size of ball
// → background-color: white → ball color
// → border-radius: 50% → perfect circle
// → transition: transform 0.3s ease → smooth sliding animation
// → Why transform in transition? Prepares for translateX movement

// .switch-button-on .slider (dark mode - moved position):
// → transform: translateX(26px) → moves ball to right
// → 26px matches the width of slider + padding
// → This class applied when currentTheme === 'dark'
// → Transition handles smooth movement automatically

// ============================================
// LOGIC FLOW
// ============================================

// Initial render (dark mode):
// → currentTheme = 'dark'
// → Main div has id='dark' → applies dark background
// → Button has class 'switch-button switch-button-on'
// → Slider ball positioned on right (translateX applied)
// → Label shows "Dark Mode"

// User clicks button:
// → toggleTheme runs
// → currentTheme changes from 'dark' to 'light'
// → Component re-renders

// After toggle (light mode):
// → Main div id changes to 'light' → applies light background
// → Button class becomes just 'switch-button' (no 'switch-button-on')
// → Slider ball slides to left (no translateX)
// → Transition creates smooth animation
// → Label shows "Light Mode"

// Click again:
// → Toggles back to dark mode
// → Cycle repeats

// ============================================
// CSS SELECTOR BREAKDOWN
// ============================================

// .switch-button-on .slider means:
// → Find element with class 'slider'
// → That is a descendant of element with class 'switch-button-on'
// → This is how we target the slider when button is in "on" state

// Why this approach works:
// → When dark mode: button has 'switch-button-on' class
// → CSS rule applies transform to slider
// → When light mode: button doesn't have 'switch-button-on' class
// → CSS rule doesn't apply, slider returns to default position
// → Transition property animates the change

// ============================================
// KEY CONCEPTS
// ============================================

// Why Context API? → Share theme state across app without prop drilling
// Why id on main div? → Easy CSS targeting for theme-specific styles
// Why position relative on button? → Container for absolute positioned slider
// Why position absolute on slider? → Allows translateX movement within button
// Why transition on transform? → Smooth sliding animation
// Why translateX? → Moves element horizontally without layout shifts
// Why 50% border-radius on slider? → Creates perfect circle
// Why template literal for className? → Combine static and conditional classes
// Why callback in setState? → Access current state value safely
// createContext(null) → Creates context with default null value
// Provider value prop → Makes data available to consuming components
