// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all password generator logic
// No separate components needed for this implementation

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: passwordLength → useState(7)
// → Controls how many characters in password
// → Default: 7 characters
// → Range: 1-20 (configurable via slider)

// State 2: includeUppercase → useState(false)
// → Boolean flag for uppercase letters (A-Z)
// → Default: false (not included initially)

// State 3: includeLowercase → useState(true)
// → Boolean flag for lowercase letters (a-z)
// → Default: true (included by default)

// State 4: includeNumbers → useState(false)
// → Boolean flag for numbers (0-9)
// → Default: false (not included initially)

// State 5: includeSymbols → useState(true)
// → Boolean flag for special characters (!@#$%...)
// → Default: true (included by default)

// State 6: password → useState('')
// → Stores generated password to display
// → Initially empty string
// → Updates when "Generate Password" clicked

// ============================================
// CHARACTER SETS (CONSTANTS)
// ============================================

// Inside generatePassword function:

// Uppercase characters:
// → const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// → 26 characters total
// → Capital letters only

// Lowercase characters:
// → const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
// → 26 characters total
// → Small letters only

// Number characters:
// → const numberChars = '0123456789'
// → 10 digits
// → All numeric characters

// Symbol characters:
// → const symbolChars = '!@#$%^&*_-'
// → 10 special characters
// → Common password symbols

// ============================================
// GENERATEPASSWORD FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Create random password based on user preferences

// STEP 1: Define character sets (as above)

// STEP 2: Build available characters pool
// → let chars = ''
// → Empty string to accumulate selected character sets

// Conditional concatenation:
// → if (includeUppercase) chars += uppercaseChars
// → if (includeLowercase) chars += lowercaseChars
// → if (includeNumbers) chars += numberChars
// → if (includeSymbols) chars += symbolChars

// How it works:
// → Each if statement checks checkbox state
// → If true, adds that character set to pool
// → += operator appends to existing string

// Example with all selected:
// → chars = ''
// → includeUppercase true → chars = 'ABCD...XYZ'
// → includeLowercase true → chars = 'ABCD...XYZabcd...xyz'
// → includeNumbers true → chars = 'ABCD...XYZabcd...xyz0123456789'
// → includeSymbols true → chars = 'ABCD...XYZabcd...xyz0123456789!@#$%^&*_-'
// → Total pool: 72 characters (26+26+10+10)

// Example with only lowercase and numbers:
// → chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
// → Total pool: 36 characters

// STEP 3: Initialize password variable
// → let finalGeneratedPassword = ''
// → Empty string to build password

// STEP 4: Loop to generate password
// → for (let i = 0; i < passwordLength; i++)
// → Runs passwordLength times
// → Example: passwordLength = 10 → loop runs 10 times

// Inside loop - pick random character:
// → finalGeneratedPassword += chars.charAt(Math.floor(Math.random() * chars.length))

// Breaking down random selection:

// Math.random():
// → Returns decimal between 0 and 0.999...
// → Example: 0.7234

// Math.random() * chars.length:
// → Multiplies by total available characters
// → Example: 0.7234 * 72 = 52.0848

// Math.floor(...):
// → Rounds down to integer
// → Example: Math.floor(52.0848) = 52

// chars.charAt(index):
// → Gets character at specific position
// → Example: chars.charAt(52) might return 'w'

// += operator:
// → Appends character to password
// → Builds password one character at a time

// Loop example with passwordLength = 3:
// → Loop 0: Random index 15 → picks 'P' → password = 'P'
// → Loop 1: Random index 48 → picks 'v' → password = 'Pv'
// → Loop 2: Random index 67 → picks '#' → password = 'Pv#'

// STEP 5: Update state with generated password
// → setPassword(finalGeneratedPassword)
// → Triggers re-render
// → Password appears in display

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'password-generator'

// SECTION 1: Slider for password length
// → div with className 'slider-container'

// Range input:
// → type='range'
//   - Creates slider UI element
// → min='1'
//   - Minimum password length: 1 character
// → max='20'
//   - Maximum password length: 20 characters
// → value={passwordLength}
//   - Controlled input, state determines position
// → onChange={(e) => setPasswordLength(Number(e.target.value))}
//   - Updates state on slider move
//   - Number() converts string to number
//   - e.target.value is string from input

// Current value display:
// → <span className='slider-value'>{passwordLength}</span>
// → Shows current length number
// → Updates as slider moves

// SECTION 2: Checkboxes for character types
// → div with className 'options-container'

// Four checkbox labels (similar pattern for each):

// Uppercase checkbox:
// → <label> wrapper
// → <input type='checkbox'
//     checked={includeUppercase}
//     onChange={(e) => setIncludeUppercase(e.target.checked)}
//   />
// → Controlled checkbox
// → e.target.checked is boolean (true/false)
// → Text: "Include Uppercase Letters"

// Lowercase checkbox:
// → checked={includeLowercase}
// → onChange={(e) => setIncludeLowercase(e.target.checked)}
// → Text: "Include Lowercase Letters"

// Numbers checkbox:
// → checked={includeNumbers}
// → onChange={(e) => setIncludeNumbers(e.target.checked)}
// → Text: "Include Numbers"

// Symbols checkbox:
// → checked={includeSymbols}
// → onChange={(e) => setIncludeSymbols(e.target.checked)}
// → Text: "Include Symbols"

// SECTION 3: Generate button
// → <button className='generate-btn' onClick={generatePassword}>
// → Triggers password generation
// → Text: "Generate Password"

// SECTION 4: Password display
// → <div className='password-display'>{password}</div>
// → Shows generated password
// → Empty initially
// → Updates after clicking generate button

// ============================================
// KEY CONCEPTS
// ============================================

// Why 6 state variables? → Each control needs independent state
// Why strings for char sets? → Easy concatenation and charAt access
// Why += for chars? → Build pool from selected character sets
// Why Math.random()? → Generate unpredictable characters
// Why Math.floor()? → Convert decimal to integer index
// Why for loop? → Repeat random selection for desired length
// Why Number() conversion? → Range input returns string value
// Why controlled inputs? → React state controls all form elements
// Why empty string initial? → No password until generate clicked
// Math.random() → Returns 0 ≤ n < 1
// charAt(index) → Get character at specific position in string
// += operator → Append to string (concatenation assignment)
// e.target.value → String value from input element
// e.target.checked → Boolean from checkbox element
// Controlled component → Form element controlled by React state