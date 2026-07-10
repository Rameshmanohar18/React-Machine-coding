// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <PasswordInput /> component
// PasswordInput.jsx → contains password strength evaluation logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: password → useState('')
// → Stores current password input value
// → Empty string initially
// → Updates with each keystroke

// State 2: strength → useState('')
// → Stores evaluated strength level
// → Values: 'Weak', 'Moderate', 'Strong', or '' (empty)
// → Initially empty (no password entered)
// → Updates automatically as password changes

// ============================================
// EVALUATESTRENGTH FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Calculate password strength based on rules

// Accepts: password (string)
// Returns: 'Weak', 'Moderate', or 'Strong'

// STEP 1: Initialize score
// → let score = 0
// → Starting point for evaluation
// → Will be increased/decreased by rules

// STEP 2: Define scoring rules array
// → const rules = [array of rule objects]
// → Each rule has: regex pattern and score value

// Rules breakdown:

// RULE 1: Length > 8 characters
// → { regex: /.{9,}/, score: 2 }
// → /.{9,}/ matches 9 or more of any character
// → .{9,} means "any character, 9 or more times"
// → Reward: +2 points
// → Example: "password1" (9 chars) matches → +2

// RULE 2: Length > 12 characters
// → { regex: /.{13,}/, score: 2 }
// → /.{13,}/ matches 13 or more characters
// → Additional length bonus on top of Rule 1
// → Reward: +2 points (cumulative with Rule 1)
// → Example: "password12345" (13 chars) → +2 (total +4 from both length rules)

// RULE 3: Contains lowercase letters
// → { regex: /[a-z]/, score: 1 }
// → /[a-z]/ matches any lowercase letter a-z
// → Reward: +1 point
// → Example: "Password" has 'a','s','s','w','o','r','d' → +1

// RULE 4: Contains uppercase letters
// → { regex: /[A-Z]/, score: 1 }
// → /[A-Z]/ matches any uppercase letter A-Z
// → Reward: +1 point
// → Example: "Password" has 'P' → +1

// RULE 5: Contains digits
// → { regex: /[0-9]/, score: 1 }
// → /[0-9]/ matches any digit 0-9
// → Reward: +1 point
// → Example: "Pass123" has '1','2','3' → +1

// RULE 6: Contains special characters
// → { regex: /[^A-Za-z0-9]/, score: 1 }
// → /[^A-Za-z0-9]/ matches anything NOT letter or digit
// → ^ inside [] means "NOT" (negation)
// → Matches symbols: !@#$%^&*()_+-=[]{}|;:'",.<>?/~`
// → Reward: +1 point
// → Example: "Pass@123" has '@' → +1

// RULE 7: Penalize bad patterns (NEGATIVE SCORE)
// → { regex: /(\d{3,})|([a-zA-Z]{3,})|(.)\1{2,}/, score: -1 }
// → Complex regex with 3 patterns using | (OR operator)
// → Penalty: -1 point

// Breaking down Rule 7 patterns:

// Pattern A: (\d{3,})
// → \d{3,} means "3 or more digits in a row"
// → Example: "123" in "pass123" → matches
// → Example: "12" doesn't match (only 2 digits)
// → Why penalize? Predictable number sequences

// Pattern B: ([a-zA-Z]{3,})
// → [a-zA-Z]{3,} means "3 or more letters in a row"
// → Example: "abc" or "ABC" or "AbC"
// → Example: "password" has many letters in row → matches
// → Why penalize? Long letter sequences are common words

// Pattern C: (.)\1{2,}
// → (.) captures any single character
// → \1 refers back to captured character (backreference)
// → {2,} means "2 or more additional times"
// → Total: same character 3+ times in row
// → Example: "aaa", "111", "!!!"
// → Example: "Pass" has no triple → doesn't match
// → Why penalize? Character repetition is weak

// Examples of Rule 7 matches:
// → "pass123word" → matches (\d{3,}) → "123"
// → "password" → matches ([a-zA-Z]{3,}) → "password"
// → "Pass111" → matches both (\d{3,}) and (.)\1{2,} → "111"
// → "aaa123" → matches both ([a-zA-Z]{3,}) and (.)\1{2,} → "aaa"

// STEP 3: Iterate through rules and calculate score
// → rules.forEach((rule) => { ... })
// → Check each rule sequentially

// For each rule:
// → if (rule.regex.test(password))
// → .test() method returns true if pattern matches
// → If match: score += rule.score
// → Adds positive or negative points

// Example scoring process for "Pass@123":
// → Start: score = 0
// → Rule 1 (/.{9,}/): "Pass@123" is 8 chars → no match → score = 0
// → Rule 2 (/.{13,}/): 8 chars < 13 → no match → score = 0
// → Rule 3 (/[a-z]/): has 'a','s','s' → match → score = 1
// → Rule 4 (/[A-Z]/): has 'P' → match → score = 2
// → Rule 5 (/[0-9]/): has '1','2','3' → match → score = 3
// → Rule 6 (/[^A-Za-z0-9]/): has '@' → match → score = 4
// → Rule 7: "123" matches (\d{3,}) → penalty → score = 3
// → Final score: 3

// STEP 4: Convert score to strength label
// → if (score <= 3) return 'Weak'
// → if (score <= 5) return 'Moderate'
// → return 'Strong'

// Score ranges:
// → 0-3 points: Weak
// → 4-5 points: Moderate
// → 6+ points: Strong

// Maximum possible score: 8
// → +2 (length > 8)
// → +2 (length > 12)
// → +1 (lowercase)
// → +1 (uppercase)
// → +1 (digits)
// → +1 (special chars)
// → -1 (bad patterns - assuming they exist)
// → Total: 7 points (if all rules pass except bad patterns)

// Without bad patterns: 8 points max
// With bad patterns: 7 points max

// ============================================
// HANDLEINPUTCHANGE FUNCTION
// ============================================

// Purpose: Update password and evaluate strength on input

// Accepts: e (event object)

// STEP 1: Get new password value
// → const newPassword = e.target.value
// → Extracts current input value
// → String from input element

// STEP 2: Update password state
// → setPassword(newPassword)
// → Saves typed value
// → Controlled input pattern

// STEP 3: Evaluate and update strength
// → setStrength(evaluateStrength(newPassword))
// → Calls evaluateStrength with new password
// → Receives 'Weak', 'Moderate', or 'Strong'
// → Updates strength state
// → Triggers re-render

// Effect:
// → Every keystroke triggers evaluation
// → Real-time feedback
// → Instant visual update

// ============================================
// JSX STRUCTURE
// ============================================

// Main wrapper: div (no specific className)

// SECTION 1: Password input
// → <input type='text' ... />

// Input attributes:
// → type='text'
//   - Shows characters (not masked)
//   - Could use type='password' to mask
// → value={password}
//   - Controlled input
//   - State determines display
// → onChange={handleInputChange}
//   - Triggers on every keystroke
// → placeholder='Enter password'
//   - Hint text when empty

// SECTION 2: Strength display
// → <div className={`password-strength ${strength.toLowerCase()}`}>

// Dynamic className:
// → Template literal combines classes
// → Base: 'password-strength'
// → Dynamic: strength.toLowerCase()
//   - 'Weak' → 'weak'
//   - 'Moderate' → 'moderate'
//   - 'Strong' → 'strong'
//   - '' (empty) → no additional class

// Example classNames:
// → Empty password: 'password-strength'
// → Weak: 'password-strength weak'
// → Moderate: 'password-strength moderate'
// → Strong: 'password-strength strong'

// Display content:
// → {strength}
// → Shows: 'Weak', 'Moderate', 'Strong', or nothing

// ============================================
// PASSWORD STRENGTH CHECKER FLOW
// ============================================

// Initial state:
// → password = ''
// → strength = ''
// → Input empty
// → Strength display empty

// User types "a":
// → onChange fires
// → newPassword = 'a'
// → setPassword('a')
// → evaluateStrength('a') called:
//   - score = 0
//   - /.{9,}/ → no (only 1 char) → 0
//   - /.{13,}/ → no → 0
//   - /[a-z]/ → yes → 1
//   - /[A-Z]/ → no → 1
//   - /[0-9]/ → no → 1
//   - /[^A-Za-z0-9]/ → no → 1
//   - Bad patterns → "a" matches ([a-zA-Z]{3,})? No (only 1 letter) → 1
//   - Final score: 1
//   - Returns: 'Weak'
// → setStrength('Weak')
// → Display shows: "Weak"
// → className: 'password-strength weak'

// User continues typing "abc":
// → newPassword = 'abc'
// → evaluateStrength('abc'):
//   - score = 0
//   - Length rules: no → 0
//   - /[a-z]/ → yes → 1
//   - Others: no → 1
//   - Bad patterns: "abc" matches ([a-zA-Z]{3,}) → penalty → 0
//   - Final score: 0
//   - Returns: 'Weak'
// → Display: "Weak"

// User types "Abc":
// → evaluateStrength('Abc'):
//   - /[a-z]/ → yes ('b','c') → 1
//   - /[A-Z]/ → yes ('A') → 2
//   - Bad patterns: "Abc" matches ([a-zA-Z]{3,}) → penalty → 1
//   - Final score: 1
//   - Returns: 'Weak'

// User types "Abc123":
// → evaluateStrength('Abc123'):
//   - /[a-z]/ → yes → 1
//   - /[A-Z]/ → yes → 2
//   - /[0-9]/ → yes → 3
//   - Bad patterns: matches both ([a-zA-Z]{3,}) and (\d{3,}) → -1 → 2
//   - Final score: 2
//   - Returns: 'Weak'

// User types "Abc@123":
// → evaluateStrength('Abc@123'):
//   - /[a-z]/ → yes → 1
//   - /[A-Z]/ → yes → 2
//   - /[0-9]/ → yes → 3
//   - /[^A-Za-z0-9]/ → yes ('@') → 4
//   - Bad patterns: "123" matches (\d{3,}) → -1 → 3
//   - Final score: 3
//   - Returns: 'Weak' (score ≤ 3)

// User types "Abc@12Xy":
// → evaluateStrength('Abc@12Xy'):
//   - Length > 8: no (8 chars exactly) → 0
//   - /[a-z]/ → yes → 1
//   - /[A-Z]/ → yes → 2
//   - /[0-9]/ → yes → 3
//   - /[^A-Za-z0-9]/ → yes → 4
//   - Bad patterns: "Abc" matches but only 3 letters, "12" only 2 digits → no penalty → 4
//   - Final score: 4
//   - Returns: 'Moderate' (4 ≤ score ≤ 5)
// → Display: "Moderate"
// → className: 'password-strength moderate'

// User types "Abc@12XyZq":
// → evaluateStrength('Abc@12XyZq'):
//   - /.{9,}/ → yes (10 chars) → 2
//   - /[a-z]/ → yes → 3
//   - /[A-Z]/ → yes → 4
//   - /[0-9]/ → yes → 5
//   - /[^A-Za-z0-9]/ → yes → 6
//   - Bad patterns: no consecutive 3+ of same type → 6
//   - Final score: 6
//   - Returns: 'Strong' (score > 5)
// → Display: "Strong"
// → className: 'password-strength strong'

// User types "Abc@12XyZq1234":
// → evaluateStrength('Abc@12XyZq1234'):
//   - /.{9,}/ → yes → 2
//   - /.{13,}/ → yes (14 chars) → 4
//   - /[a-z]/ → yes → 5
//   - /[A-Z]/ → yes → 6
//   - /[0-9]/ → yes → 7
//   - /[^A-Za-z0-9]/ → yes → 8
//   - Bad patterns: "1234" matches (\d{3,}) → -1 → 7
//   - Final score: 7
//   - Returns: 'Strong'
// → Display: "Strong"

// ============================================
// REGEX PATTERNS EXPLAINED
// ============================================

// Length patterns:

// /.{9,}/:
// → . (dot) matches any character
// → {9,} quantifier means "9 or more"
// → Checks minimum 9 characters

// /.{13,}/:
// → Same as above but 13 or more
// → Cumulative with first length check

// Character class patterns:

// /[a-z]/:
// → Square brackets define character class
// → a-z is range from 'a' to 'z'
// → Matches any single lowercase letter

// /[A-Z]/:
// → A-Z range from 'A' to 'Z'
// → Matches any single uppercase letter

// /[0-9]/:
// → 0-9 range from '0' to '9'
// → Matches any single digit
// → Alternative: \d (shorthand for digit)

// /[^A-Za-z0-9]/:
// → ^ inside [] means negation (NOT)
// → A-Za-z0-9 are all alphanumeric
// → [^...] matches anything NOT alphanumeric
// → Effectively matches special characters

// Complex penalty pattern:

// /(\d{3,})|([a-zA-Z]{3,})|(.)\1{2,}/:
// → Three sub-patterns connected with | (OR)
// → Matches if ANY sub-pattern matches

// Sub-pattern 1: (\d{3,})
// → () creates capture group
// → \d is digit shorthand
// → {3,} means "3 or more"
// → Matches: "123", "4567", "000"

// Sub-pattern 2: ([a-zA-Z]{3,})
// → () capture group
// → [a-zA-Z] any letter
// → {3,} three or more
// → Matches: "abc", "ABC", "Password"

// Sub-pattern 3: (.)\1{2,}
// → (.) captures any single character
// → \1 backreference to captured character
// → {2,} means "2 or more additional times"
// → Total: same character repeated 3+ times
// → Example: "aaa" → captures 'a', \1\1 matches next two 'a's
// → Matches: "aaa", "111", "!!!", "zzz"

// ============================================
// CSS STRUCTURE (EXPECTED)
// ============================================

// Container styling:
// → Center input and display
// → Padding, margins for spacing

// Input styling:
// → padding: 10px
// → font-size: 16px
// → border: 1px solid #ccc
// → border-radius: 4px
// → width: 300px
// → margin-bottom: 10px

// .password-strength (base class):
// → padding: 10px
// → border-radius: 4px
// → text-align: center
// → font-weight: bold
// → transition: all 0.3s ease
// → Default: no background, no text

// .password-strength.weak:
// → background-color: #ffcccc (light red)
// → color: #cc0000 (dark red)
// → border: 2px solid #ff0000

// .password-strength.moderate:
// → background-color: #ffffcc (light yellow)
// → color: #cc9900 (dark yellow/orange)
// → border: 2px solid #ffcc00

// .password-strength.strong:
// → background-color: #ccffcc (light green)
// → color: #00cc00 (dark green)
// → border: 2px solid #00ff00

// Visual progression:
// → Red → Yellow → Green
// → Weak → Moderate → Strong
// → Intuitive color coding

// ============================================
// .TEST() METHOD EXPLAINED
// ============================================

// Syntax:
// → regex.test(string)

// Returns:
// → true if pattern matches
// → false if no match

// Examples:
// → /[a-z]/.test('Hello') → true ('e', 'l', 'o')
// → /[a-z]/.test('HELLO') → false (no lowercase)
// → /[0-9]/.test('abc123') → true ('1', '2', '3')
// → /[0-9]/.test('abc') → false (no digits)

// Why .test()?
// → Fast boolean check
// → Don't need match details
// → Perfect for validation
// → More efficient than .match()

// ============================================
// BACKREFERENCE PATTERN EXPLAINED
// ============================================

// Pattern: (.)\1{2,}

// Step-by-step matching:

// Example string: "aaa"
// → (.) captures 'a' (first character)
// → \1 references captured 'a'
// → \1{2,} means "the captured character, 2+ more times"
// → Matches second and third 'a'
// → Total: 'aaa' matches

// Example string: "abc"
// → (.) captures 'a'
// → \1{2,} looks for 2+ more 'a's
// → Finds 'b' instead
// → No match

// Example string: "1112"
// → (.) captures '1'
// → \1{2,} matches second and third '1'
// → '111' matches (ignores '2')

// Why penalize?
// → Repeated characters are easy to guess
// → "aaa" or "111" are weak patterns
// → Even in longer passwords

// ============================================
// REAL-TIME EVALUATION
// ============================================

// Every keystroke:
// → onChange handler fires
// → handleInputChange executes
// → evaluateStrength runs
// → Score calculated
// → Strength label determined
// → State updated
// → Component re-renders
// → Display updates

// Performance:
// → Regex operations are fast
// → 7 regex tests per keystroke
// → Negligible performance impact
// → Smooth user experience

// Why real-time?
// → Immediate feedback
// → Guides user to stronger passwords
// → Better UX than submit-time validation
// → Encourages good password practices

// ============================================
// CONTROLLED INPUT PATTERN
// ============================================

// Input characteristics:
// → value={password}
//   - State controls display
// → onChange={handleInputChange}
//   - User input updates state
// → Two-way binding

// Benefits:
// → React manages input state
// → Can programmatically set value
// → Easy to clear/reset
// → Predictable behavior

// Alternative (uncontrolled):
// → No value prop
// → Use ref to read value
// → DOM manages state
// → Less React-like

// ============================================
// ENHANCEMENTS (OPTIONAL)
// ============================================

// Password visibility toggle:
// → Switch between type='text' and type='password'
// → Show/hide password button
// → Better UX

// Progress bar:
// → Visual bar showing strength
// → Length proportional to score
// → Color-coded segments

// Specific requirements list:
// → Checklist of requirements
// → Check/cross for each rule
// → More detailed feedback

// Password suggestions:
// → Show common password mistakes
// → Suggest improvements
// → Educational component

// Minimum length requirement:
// → Enforce minimum (e.g., 8 chars)
// → Disable submit until met
// → Clear validation

// Confirmation field:
// → Second input to confirm
// → Match validation
// → Prevent typos

// ============================================
// EDGE CASES
// ============================================

// Empty password:
// → score = 0
// → Returns: 'Weak'
// → Display: "Weak"
// → Could handle specially (show nothing)

// Very long password:
// → All rules might match
// → Maximum score achieved
// → Returns: 'Strong'
// → Works as expected

// Only special characters:
// → "!@#$%^&*"
// → Gets special char points
// → Might get length points
// → No lowercase/uppercase/digit points
// → Likely 'Weak' or 'Moderate'

// All same character:
// → "aaaaaaaaaaa"
// → Gets length points
// → Gets lowercase points
// → Heavy penalty for (.)\1{2,}
// → Likely 'Weak'

// Common patterns:
// → "password123"
// → Gets various points
// → Penalty for patterns
// → Likely 'Weak' or 'Moderate'

// ============================================
// KEY CONCEPTS
// ============================================

// Why forEach instead of map? → Not returning new array, just calculating
// Why += operator? → Accumulate score from multiple rules
// Why negative score possible? → Penalize weak patterns
// Why regex for validation? → Powerful pattern matching
// Why real-time checking? → Immediate user feedback
// Why controlled input? → React state management
// Why lowercase className? → CSS naming convention
// .test() → Boolean check if regex matches
// Template literal className → Combine static and dynamic classes
// Backreference \1 → Match previously captured group
// forEach → Execute function for each array element
// Ternary returns → Concise conditional logic
// score += value → Add to accumulator (positive or negative)