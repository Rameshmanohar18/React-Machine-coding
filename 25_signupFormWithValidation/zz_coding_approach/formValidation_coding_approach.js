// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Register /> component
// Register.jsx → complete registration form with validation

// ============================================
// REGISTER.JSX - STATE MANAGEMENT
// ============================================

// USERNAME STATES:

// State 1: userName → useState('')
// → Stores username input value

// State 2: validName → useState(false)
// → Boolean tracking if username meets validation rules
// → Updated by useEffect whenever userName changes

// State 3: userFocus → useState(false)
// → Tracks if username input is focused
// → Controls visibility of instruction message

// PASSWORD STATES:

// State 4: password → useState('')
// → Stores password input value

// State 5: validPassword → useState(false)
// → Boolean tracking if password meets validation rules
// → Updated by useEffect whenever password changes

// State 6: passwordFocus → useState(false)
// → Tracks if password input is focused
// → Controls visibility of instruction message

// CONFIRM PASSWORD STATES:

// State 7: confirmPassword → useState('')
// → Stores confirm password input value

// State 8: validMatch → useState(false)
// → Boolean tracking if confirmPassword matches password
// → Updated by useEffect

// State 9: matchFocus → useState(false)
// → Tracks if confirm password input is focused
// → Controls visibility of instruction message

// SUCCESS STATE:

// State 10: success → useState(false)
// → Boolean tracking successful registration
// → Switches UI to success message

// ============================================
// VALIDATION FUNCTIONS
// ============================================

// isValidUsername function:
// → Accepts: username (string)
// → Returns: boolean (true if valid, false if not)

// Validation rules:

// RULE 1: Length check
// → if (username.length < 4 || username.length > 24) return false
// → Must be between 4-24 characters

// RULE 2: First character check
// → if (!username.match(/^[A-Za-z]/)) return false
// → /^[A-Za-z]/ → regex checks first character is letter
// → ^ means start of string
// → [A-Za-z] means uppercase or lowercase letter
// → Returns false if first character not a letter

// RULE 3: Allowed characters check
// → if (!username.match(/^[A-Za-z0-9-_]+$/)) return false
// → /^[A-Za-z0-9-_]+$/ → only letters, numbers, hyphens, underscores
// → + means one or more characters
// → $ means end of string
// → Returns false if contains invalid characters

// RULE 4: All checks passed
// → return true

// Example validations:
// → "john123" → true (valid)
// → "jo" → false (too short)
// → "1john" → false (starts with number)
// → "john@123" → false (invalid character @)

// ============================================
// PASSWORD VALIDATION FUNCTION
// ============================================

// isValidPassword function:
// → Accepts: password (string)
// → Returns: boolean

// Validation rules:

// RULE 1: Length check
// → if (password.length < 8 || password.length > 24) return false
// → Must be 8-24 characters

// RULE 2: Lowercase check
// → if (!password.match(/[a-z]/)) return false
// → /[a-z]/ → at least one lowercase letter
// → Returns false if no lowercase

// RULE 3: Uppercase check
// → if (!password.match(/[A-Z]/)) return false
// → /[A-Z]/ → at least one uppercase letter

// RULE 4: Number check
// → if (!password.match(/[0-9]/)) return false
// → /[0-9]/ → at least one digit

// RULE 5: Special character check
// → if (!password.match(/[!@#$%]/)) return false
// → /[!@#$%]/ → at least one of these special characters
// → Only these 5 special characters allowed

// RULE 6: All checks passed
// → return true

// Example validations:
// → "Pass123!" → true (valid)
// → "pass123!" → false (no uppercase)
// → "PASSWORD!" → false (no lowercase, no number)
// → "Pass123" → false (no special character)

// ============================================
// useEffect: USERNAME VALIDATION
// ============================================

// Dependency: [userName]
// → Runs whenever userName state changes

// Logic:
// → setValidName(isValidUsername(userName))
// → Calls validation function
// → Updates validName state with result

// Why useEffect?
// → Real-time validation as user types
// → Separates validation logic from input handler

// Alternative (commented):
// → setValidName(USER_REGEX.test(userName))
// → Using regex directly instead of function

// ============================================
// useEffect: PASSWORD VALIDATION
// ============================================

// Dependency: [password, confirmPassword]
// → Runs when either password or confirmPassword changes

// Logic:

// STEP 1: Validate password strength
// → setValidPassword(isValidPassword(password))
// → Checks password meets all requirements

// STEP 2: Check password match
// → setValidMatch(password === confirmPassword)
// → Simple equality check
// → Both must be identical strings

// Why both dependencies?
// → Changing password → revalidate strength and match
// → Changing confirmPassword → only revalidate match

// ============================================
// HANDLESUBMIT FUNCTION
// ============================================

// Purpose: Process form submission

// Accepts: e (event object)

// Logic:

// STEP 1: Prevent default
// → e.preventDefault()
// → Stops page reload

// STEP 2: Set success state
// → setSuccess(true)
// → Triggers success message UI

// STEP 3: Clear all inputs
// → setUserName('')
// → setPassword('')
// → setConfirmPassword('')
// → Resets form for new user

// Note: No validation check in handleSubmit
// → Why? Button is disabled if validation fails
// → Button only clickable when all validations pass

// ============================================
// JSX STRUCTURE - CONDITIONAL RENDERING
// ============================================

// Root: Fragment (<> </>)

// Top-level conditional: {success ? ... : ...}

// IF SUCCESS (success is true):

// Success section:
// → h1 with className 'success-text'
// → Text: "Success!"
// → Link: <a href='/'>Back to Home</a>

// ELSE (success is false):

// Registration form section:
// → h1 with text "Register"
// → Form element with onSubmit={handleSubmit}

// ============================================
// FORM FIELDS - USERNAME INPUT
// ============================================

// Label:
// → htmlFor='username'
// → Text: "Username:"

// Input field:
// → type='text'
// → id='username'
// → autoComplete='off' → prevents browser autofill
// → value={userName} → controlled input
// → onChange={(e) => setUserName(e.target.value)}
// → required → HTML5 validation

// Dynamic className:
// → className={validName ? 'valid-name' : 'invalid-name'}
// → Changes styling based on validation

// Accessibility attributes:
// → aria-invalid={validName ? 'false' : 'true'}
// → Tells screen readers if input is invalid
// → aria-describedby='uidnote'
// → Links to instruction paragraph

// Focus handlers:
// → onFocus={() => setUserFocus(true)}
// → onBlur={() => setUserFocus(false)}
// → Track focus state for showing instructions

// Instruction paragraph:
// → id='uidnote' (matches aria-describedby)
// → Dynamic className:
//   - userFocus && !validName ? 'instructions' : 'offscreen'
//   - Show instructions when: focused AND invalid
//   - Hide when: not focused OR valid
// → Content: validation rules text with <br /> tags

// ============================================
// FORM FIELDS - PASSWORD INPUT
// ============================================

// Label:
// → htmlFor='password'
// → Text: "Password:"

// Input field:
// → type='password' → masks input
// → id='password'
// → value={password}
// → onChange={(e) => setPassword(e.target.value)}
// → required

// Dynamic className:
// → className={validPassword ? 'valid-password' : 'invalid-password'}

// Accessibility:
// → aria-invalid={!validPassword}
// → Boolean value (true if invalid)

// Focus handlers:
// → onFocus={() => setPasswordFocus(true)}
// → onBlur={() => setPasswordFocus(false)}

// Instruction paragraph:
// → id='pwdnote'
// → Dynamic className:
//   - passwordFocus && !validPassword ? 'instructions' : 'offscreen'
// → Content: password requirements
// → Special character hints with aria-label:
//   - <span aria-label='exclamation mark'>!</span>
//   - Screen reader announces label instead of symbol

// ============================================
// FORM FIELDS - CONFIRM PASSWORD INPUT
// ============================================

// Label:
// → htmlFor='confirm_pwd'
// → Text: "Confirm Password:"

// Input field:
// → type='password'
// → id='confirm_pwd'
// → value={confirmPassword}
// → onChange={(e) => setConfirmPassword(e.target.value)}
// → required

// Dynamic className (complex logic):
// → className={validPassword && confirmPassword === password ? 'confirmed-password' : 'invalid-password'}
// → Green/confirmed style when:
//   - Password is valid AND
//   - Confirm password matches password
// → Invalid style otherwise

// Accessibility:
// → aria-invalid={validMatch ? 'false' : 'true'}
// → aria-describedby='confirmnote'

// Focus handlers:
// → onFocus={() => setMatchFocus(true)}
// → onBlur={() => setMatchFocus(false)}

// Instruction paragraph:
// → id='confirmnote'
// → Dynamic className:
//   - matchFocus && !validMatch ? 'instructions' : 'offscreen'
// → Content: "Must match the above password input field."

// ============================================
// SUBMIT BUTTON
// ============================================

// Button element:
// → Text: "Sign Up"
// → type='submit' (implicit, triggers form onSubmit)

// Disabled logic:
// → disabled={!validName || !validPassword || !validMatch ? true : false}
// → Can simplify to: disabled={!validName || !validPassword || !validMatch}

// Button disabled when:
// → Username invalid OR
// → Password invalid OR
// → Passwords don't match

// Button enabled when:
// → All three validations pass

// Why controlled inputs? → React state controls value, easier validation
// Why real-time validation? → Immediate feedback improves UX
// Why focus states? → Show hints only when needed, cleaner UI
// Why disabled button? → Prevent invalid submission, clear feedback
// Why clear on success? → Reset for next user, fresh state
// Why separate validation functions? → Reusable, testable, readable
// Why useEffect for validation? → Automatic updates, separation of concerns
// Why multiple states? → Track each field independently
// .match() method → Tests string against regex, returns match or null
// Truthy/falsy → !username.match() checks if null (no match)
// aria attributes → Accessibility for screen readers
// onFocus/onBlur → Standard events for input focus tracking
// e.preventDefault() → Stops default form submission behavior
