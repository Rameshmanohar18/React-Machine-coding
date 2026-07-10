// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: likes → useState(100)
// → Count of total likes
// → Increments/decrements based on user action

// State 2: dislikes → useState(25)
// → Count of total dislikes
// → Increments/decrements based on user action

// State 3: liked → useState(false)
// → Boolean tracking if current user liked
// → Controls button styling and behavior

// State 4: disliked → useState(false)
// → Boolean tracking if current user disliked
// → Controls button styling and behavior

// ============================================
// HANDLELIKE FUNCTION
// ============================================

// Logic:
// → if (liked) - user already liked, toggle off
//   - setLikes(likes - 1)
//   - setLiked(false)
// → else - user hasn't liked, toggle on
//   - setLikes(likes + 1)
//   - setLiked(true)
//   - if (disliked) - remove dislike
//     * setDislikes(dislikes - 1)
//     * setDisliked(false)

// Mutual exclusivity: Can't like and dislike simultaneously

// ============================================
// HANDLEDISLIKE FUNCTION
// ============================================

// Logic:
// → if (disliked) - user already disliked, toggle off
//   - setDislikes(dislikes - 1)
//   - setDisliked(false)
// → else - user hasn't disliked, toggle on
//   - setDislikes(dislikes + 1)
//   - setDisliked(true)
//   - if (liked) - remove like
//     * setLikes(likes - 1)
//     * setLiked(false)

// Mutual exclusivity: Disliking removes like if active

// ============================================
// JSX STRUCTURE
// ============================================

// Like button:
// → className={`like-button ${liked ? 'liked' : ''}`}
// → Dynamic class based on liked state
// → onClick={handleLike}
// → Display: "Like | {likes}"

// Dislike button:
// → className={`dislike-button ${disliked ? 'disliked' : ''}`}
// → Dynamic class based on disliked state
// → onClick={handleDislike}
// → Display: "Dislike | {dislikes}"

// ============================================
// KEY CONCEPTS
// ============================================

// Toggle pattern → if (active) turn off, else turn on
// Mutual exclusivity → Activating one deactivates the other
// Nested conditionals → Check opposite button state when toggling
// Dynamic className → Template literal for conditional styling
// Counter state → Separate count and active state for each action
// Multiple state updates → 2-4 setState calls per click
// Boolean flags → Track user's current selection