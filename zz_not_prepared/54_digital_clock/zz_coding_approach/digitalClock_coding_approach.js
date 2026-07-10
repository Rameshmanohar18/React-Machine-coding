// ============================================
// STATE MANAGEMENT
// ============================================

// State: time → useState(new Date())
// → Stores current Date object
// → Updates every second

// ============================================
// useEffect - TIMER LOGIC
// ============================================

// Dependencies: []
// → Runs once on mount

// Logic:
// → setInterval(() => setTime(new Date()), 1000)
// → Updates time every 1000ms (1 second)
// → Cleanup: return () => clearInterval(timer)

// ============================================
// TIME FORMATTING LOGIC
// ============================================

// Extract time components:
// → hours = time.getHours() (0-23)
// → minutes = time.getMinutes() (0-59)
// → seconds = time.getSeconds() (0-59)

// Determine AM/PM:
// → ampm = hours >= 12 ? 'PM' : 'AM'

// Convert to 12-hour format:
// → hours = hours % 12
// → hours = hours ? hours : 12
// → 0 becomes 12, 13 becomes 1, etc.

// formatNumber function:
// → String(num).padStart(2, '0')
// → Adds leading zero: 5 → '05', 12 → '12'

// ============================================
// JSX STRUCTURE
// ============================================

// Clock display:
// → Hours: {formatNumber(hours)}
// → Colon separator: ':'
// → Minutes: {formatNumber(minutes)}
// → Colon separator: ':'
// → Seconds: {formatNumber(seconds)}
// → AM/PM indicator: {ampm}

// ============================================
// CSS KEY FEATURES
// ============================================

// .clock-container:
// → Centered with flexbox (100vh height)
// → Dark background (#222)

// .time:
// → font-size: 48px
// → color: #0ff (cyan)
// → monospace font

// .colon animation:
// → @keyframes blink - opacity toggle
// → animation: blink 1s infinite

// ============================================
// KEY CONCEPTS
// ============================================

// setInterval(fn, 1000) → Execute function every second
// clearInterval cleanup → Prevent memory leaks
// new Date() → Get current date/time
// .getHours/Minutes/Seconds() → Extract time components
// hours % 12 → Convert 24-hour to 12-hour format
// .padStart(2, '0') → Add leading zeros (5 → '05')
// Ternary for AM/PM → hours >= 12 determines period
// CSS animation → Blinking colon effect