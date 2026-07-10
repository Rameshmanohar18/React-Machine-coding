// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <StarRating /> component
// StarRating.jsx → contains all star rating logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: rating → useState(0)
// → Stores the selected/clicked rating (1-5)
// → Starts at 0 (no rating selected)

// ============================================
// RATING MESSAGES ARRAY
// ============================================

// Constant array: ratingMessages
// → ['Awful', 'Poor', 'Fair', 'Good', 'Excellent']
// → Index 0 = Awful (1 star), Index 4 = Excellent (5 stars)

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'container'

// Star rating div with className 'star-rating':
// → Contains two parts: stars + message

// PART 1: Generate 5 stars
// → Array.from({ length: 5 }, (_, index) => renderStar(index))
// → Creates array with 5 slots
// → Calls renderStar for each index (0 to 4)

// PART 2: Display rating message
// → Span element with className 'rating-message'
// → Inside: <strong>{getRatingMessage(currentRating)}</strong>
// → Shows text feedback for current rating

// ============================================
// getRatingMessage FUNCTION
// ============================================

// Purpose: Convert numeric rating to text message

// Accepts: currentRatingValue (the numeric rating)

// Logic:
// → return ratingMessages[Math.ceil(currentRatingValue) - 1]

// Why Math.ceil? → Rounds up decimal values
// → Example: 2.3 becomes 3 (Fair rating)

// Why -1? → Convert from 1-based rating to 0-based array index
// → Example: rating 1 → index 0 (Awful)
// → Example: rating 5 → index 4 (Excellent)

// ============================================
// renderStar FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Render individual star element

// Accepts: index (0 to 4)

// STEP 1: Calculate fullStar boolean
// → const fullStar = currentRating > index
// → Examples:
//   - currentRating = 3, index = 0 → 3 > 0 → true (filled)
//   - currentRating = 3, index = 2 → 3 > 2 → true (filled)
//   - currentRating = 3, index = 3 → 3 > 3 → false (empty)
//   - currentRating = 3, index = 4 → 3 > 4 → false (empty)

// STEP 2: Return span element with:

// key={index} → React key for list rendering

// className logic:
// → `star ${fullStar ? 'full' : ''}`
// → Base class: 'star'
// → Conditional class: 'full' added when fullStar is true

// onClick event:
// → onClick={() => handleClick(index + 1)}
// → index + 1 converts 0-4 to 1-5
// → Example: clicking first star (index 0) sets rating to 1

// onMouseOver event:
// → onMouseOver={() => handleMouseOver(index + 1)}
// → index + 1 converts 0-4 to 1-5
// → Shows preview as user hovers

// onMouseLeave event:
// → onMouseLeave={handleMouseLeave}
// → No parameter needed (always resets to 0)

// Display logic:
// → {fullStar ? '★' : '☆'}
// → Filled star (★) if fullStar is true
// → Empty star (☆) if fullStar is false

// ============================================
// EVENT HANDLERS
// ============================================

// handleClick function:
// → Accepts: value (the star number 1-5)
// → Logic: setRating(value)
// → Sets permanent rating when user clicks

// handleMouseOver function:
// → Accepts: value (the star number 1-5)
// → Logic: setHoverRating(value)
// → Shows temporary preview while hovering

// handleMouseLeave function:
// → No parameters
// → Logic: setHoverRating(0)
// → Resets hover state when mouse leaves stars
// → Returns to showing actual rating

// ============================================
// CSS APPROACH
// ============================================

// .container:
// → Center content: display flex, justify-content/align-items center

// .star-rating:
// → position: relative (for absolute positioning of message)
// → display: flex or inline-flex
// → align-items: center

// .star (base star styling):
// → cursor: pointer (shows it's clickable)
// → font-size: 2rem or larger (make stars bigger)
// → color: grey (default empty star color)
// → margin: 0 10px (spacing between stars)

// .star.full (filled star styling):
// → color: gold (or yellow for filled stars)
// → This overrides grey color when 'full' class is present

// .rating-message:
// → Optional: position absolute for placement
// → margin-left or display block for spacing
// → font-size, color for text styling

// ============================================
// STAR RATING FLOW
// ============================================

// Initial state:
// → rating = 0, hoverRating = 0
// → currentRating = 0 || 0 = 0
// → All 5 stars show empty (☆) with grey color
// → getRatingMessage(0) → ratingMessages[-1] → undefined (no message)

// User hovers over 3rd star (index 2):
// → handleMouseOver(3) called
// → setHoverRating(3)
// → currentRating = 3 || 0 = 3
// → fullStar calculation:
//   - Star 0: 3 > 0 → true → filled (★) gold
//   - Star 1: 3 > 1 → true → filled (★) gold
//   - Star 2: 3 > 2 → true → filled (★) gold
//   - Star 3: 3 > 3 → false → empty (☆) grey
//   - Star 4: 3 > 4 → false → empty (☆) grey
// → Message shows: getRatingMessage(3) → ratingMessages[3-1] → "Fair"

// User moves mouse away:
// → handleMouseLeave called
// → setHoverRating(0)
// → currentRating = 0 || 0 = 0
// → All stars return to empty (☆) grey
// → No message shown

// User hovers and clicks 4th star (index 3):
// → handleMouseOver(4) → hoverRating = 4 (preview)
// → handleClick(4) → rating = 4 (permanent)
// → currentRating = 4 || 4 = 4
// → First 4 stars filled, 5th empty
// → Message shows: "Good"

// User moves mouse away after clicking:
// → handleMouseLeave called
// → setHoverRating(0)
// → currentRating = 0 || 4 = 4
// → Rating stays at 4 (permanent)
// → First 4 stars remain filled
// → Message still shows: "Good"

// User hovers over 2nd star (index 1) after rating is 4:
// → handleMouseOver(2)
// → setHoverRating(2)
// → currentRating = 2 || 4 = 2
// → Preview shows 2 filled stars (temporary)
// → Message shows: "Poor"
// → If user doesn't click, returns to 4 stars on mouse leave

// User clicks 2nd star:
// → handleClick(2)
// → setRating(2)
// → currentRating = 0 || 2 = 2 (after mouse leave)
// → Rating updated to 2 stars permanently

// ============================================
// KEY CONCEPTS
// ============================================

// Why hoverRating || rating? → Show preview on hover, permanent on click
// Why index + 1? → Convert 0-based index to 1-based rating (1-5)
// Why currentRating > index? → Fill stars up to current rating
// Why Math.ceil? → Round up for fractional ratings (if needed)
// Why -1 in getRatingMessage? → Convert rating (1-5) to array index (0-4)
// Why reset hoverRating to 0? → Return to showing actual rating
// Why two unicode stars? → ★ filled (U+2605), ☆ empty (U+2606)
// .star.full selector → Targets elements with both classes
// OR operator short-circuit → If first truthy, uses it; otherwise second
// Greater than comparison → index 0,1,2 are < rating 3, so all filled
