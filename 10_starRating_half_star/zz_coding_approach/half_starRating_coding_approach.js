// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <StarRating /> component
// StarRating.jsx → contains star rating with half-star support

// ============================================
// STATE MANAGEMENT
// ============================================

// State: rating → useState(0)
// → Stores selected rating (can be decimal like 2.5, 3.5, 4.5)
// → Starts at 0 (no rating selected)

// Note: No hoverRating state in this version (simpler, click-only)

// ============================================
// RATING MESSAGES ARRAY
// ============================================

// Constant: ratingMessages
// → ['Awful', 'Poor', 'Fair', 'Good', 'Excellent']
// → Same as before, index 0-4 maps to 1-5 star ratings

// ============================================
// isLeftHalf HELPER FUNCTION
// ============================================

// Purpose: Detect if click is on left or right half of star

// Accepts: event (click event object)

// STEP 1: Get element's position
// → const rect = event.currentTarget.getBoundingClientRect()
// → getBoundingClientRect() returns element's size and position

// STEP 2: Calculate click position relative to element
// → const x = event.clientX - rect.left
// → event.clientX = absolute X position of click
// → rect.left = left edge of element
// → Subtraction gives position within the element

// STEP 3: Check if in left half
// → return x < rect.width / 2
// → Example: star width 40px, click at 15px → 15 < 20 → true (left half)
// → Example: star width 40px, click at 25px → 25 < 20 → false (right half)

// ============================================
// getRatingMessage FUNCTION
// ============================================

// Same as before:
// → return ratingMessages[Math.ceil(currentRatingValue) - 1]
// → Math.ceil rounds up (2.5 becomes 3)
// → Subtract 1 for array index

// ============================================
// handleClick FUNCTION
// ============================================

// Accepts: (value, isHalf = false)
// → value: star number (1-5)
// → isHalf: boolean indicating if left half was clicked

// Logic:
// → const newRating = isHalf ? value - 0.5 : value

// Examples:
// → value = 3, isHalf = true → newRating = 3 - 0.5 = 2.5
// → value = 3, isHalf = false → newRating = 3

// Update state:
// → setRating(newRating)

// ============================================
// renderStar FUNCTION (CORE LOGIC)
// ============================================

// Accepts: index (0 to 4)

// STEP 1: Calculate fullStar
// → const fullStar = rating > index
// → Same as before, checks if star should be fully filled

// STEP 2: Calculate halfStar (NEW LOGIC)
// → const halfStar = rating > index && rating < index + 1
// → Checks if rating falls between index and index+1

// Examples:
// → rating = 2.5, index = 2 → 2.5 > 2 && 2.5 < 3 → true (3rd star is half)
// → rating = 2.5, index = 1 → 2.5 > 1 && 2.5 < 2 → false (2nd star full)
// → rating = 2.5, index = 3 → 2.5 > 3 → false (4th star empty)

// STEP 3: Create handleStarClick function (nested)
// → Detects which half of star was clicked
// → const isHalf = isLeftHalf(event)
// → Calls: handleClick(index + 1, isHalf)
// → Example: Click left of 4th star (index 3) → handleClick(4, true) → rating = 3.5

// STEP 4: Calculate CSS classes
// → Base: 'star' (always present)
// → Conditional: 'full' when fullStar && !halfStar
// → Conditional: 'half' when halfStar
// → Template: `star ${fullStar && !halfStar ? 'full' : ''} ${halfStar ? 'half' : ''}`

// STEP 5: Return span with conditional rendering

// Span attributes:
// → key={index}
// → className={starClasses}
// → onClick={handleStarClick}

// Display logic (3 cases):

// CASE 1: halfStar is true
// → Render composite half-star using nested spans:
// → Wrapper span with className 'star-wrapper'
// → Background: span with '☆' (empty star) and className 'star-empty'
// → Foreground: span with '★' (filled star) and className 'star-half-filled'
// → CSS will clip the filled star to show only left half

// CASE 2: fullStar is true (but not halfStar)
// → Simply render: '★'

// CASE 3: empty star (default)
// → Simply render: '☆'

// ============================================
// JSX STRUCTURE
// ============================================

// Container div with className 'container'

// Star rating wrapper div:
// → className 'star-rating-wrapper'

// Inside wrapper, two divs:

// DIV 1: Star rating div
// → className 'star-rating'
// → Contains: Array.from({ length: 5 }, (_, index) => renderStar(index))

// DIV 2: Rating message span
// → className 'rating-message'
// → Contains: <strong>{getRatingMessage(rating)}</strong>

// ============================================
// CSS APPROACH - HALF STAR DISPLAY
// ============================================

// .star (base styling):
// → Same as before: cursor pointer, font-size, color grey, margin

// .star.full (filled star):
// → color: gold

// .star-wrapper (NEW):
// → position: relative
// → display: inline-block
// → Needed for absolute positioning of inner spans

// .star-empty (NEW - background empty star):
// → position: relative or static
// → color: grey
// → This is the full empty star visible on right half

// .star-half-filled (NEW - foreground filled star, clipped):
// → position: absolute
// → top: 0, left: 0 (overlay on top of empty star)
// → color: gold
// → width: 50% (CRITICAL: only show left half)
// → overflow: hidden (clips the star to show only left portion)
// → z-index: 1 (appears above empty star)

// How it works visually:
// → Empty star (☆) displays full width in grey
// → Filled star (★) overlays on top in gold, but clipped to 50% width
// → Result: Left half gold (filled), right half grey (empty)

// ============================================
// HALF-STAR RATING FLOW
// ============================================

// Initial state:
// → rating = 0
// → All stars empty (☆) grey

// User clicks left half of 3rd star (index 2):
// → handleStarClick triggered
// → isLeftHalf(event) returns true
// → handleClick(3, true) called
// → newRating = 3 - 0.5 = 2.5
// → setRating(2.5)
// → Component re-renders

// After setting rating to 2.5:
// → Star 0 (index 0): rating 2.5 > 0 → fullStar true, halfStar false → shows ★ gold
// → Star 1 (index 1): rating 2.5 > 1 → fullStar true, halfStar false → shows ★ gold
// → Star 2 (index 2): rating 2.5 > 2 && 2.5 < 3 → halfStar true → shows composite half-star
// → Star 3 (index 3): rating 2.5 not > 3 → fullStar false → shows ☆ grey
// → Star 4 (index 4): rating 2.5 not > 4 → fullStar false → shows ☆ grey
// → Message: getRatingMessage(2.5) → Math.ceil(2.5) - 1 = 3 - 1 = 2 → "Fair"

// User clicks right half of 4th star (index 3):
// → isLeftHalf(event) returns false
// → handleClick(4, false) called
// → newRating = 4
// → setRating(4)
// → First 4 stars show ★ gold, 5th star shows ☆ grey
// → Message: "Good"

// User clicks left half of 5th star (index 4):
// → isLeftHalf(event) returns true
// → handleClick(5, true) called
// → newRating = 5 - 0.5 = 4.5
// → First 4 stars full, 5th star half-filled
// → Message: Math.ceil(4.5) - 1 = 5 - 1 = 4 → "Excellent"

// ============================================
// KEY CONCEPTS
// ============================================

// Why getBoundingClientRect? → Get element's exact position and size
// Why event.clientX - rect.left? → Convert absolute click to relative position
// Why x < rect.width / 2? → Determine if click is in left or right half
// Why rating > index && rating < index + 1? → Check if decimal rating falls in this star's range
// Why composite spans for half-star? → Layer filled over empty, clip filled to 50%
// Why position absolute on star-half-filled? → Overlay on top of empty star
// Why width 50% with overflow hidden? → Show only left half of filled star
// Why fullStar && !halfStar for 'full' class? → Exclude half-stars from full styling
// Why Math.ceil in getRatingMessage? → Round 2.5 to 3 for message lookup
// value - 0.5 → Convert full star click to half-star rating
// Two-span technique → Creates visual half-star effect without custom graphics
