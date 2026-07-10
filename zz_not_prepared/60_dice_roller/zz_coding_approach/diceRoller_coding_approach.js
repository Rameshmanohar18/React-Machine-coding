// Inside DiceRoller.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) numberOfDice ---> 6 (default) ---> holds the number of dice to roll
// ii) diceResults ---> empty array ([]) ---> holds the results of dice rolls (visual dice values)

// Step 2:

// I'll directly jump on the return JSX template

// i) main container div with 'container' className
// ii) Inside main container we have h2 title, input section, and conditional dice results
// iii) Input section contains:
//     - Number input with 'input-field' className
//     - Roll button with 'roll-button' className
// iv) Dice results section conditionally displays:
//     - Dice container with 'dice-container' className
//     - Calls renderDiceInRows() function to display visual dice

// JSX Structure:
// <>
//   <div className='container'>
//     <h2 className='title'>Number of Dice</h2>
//     <div className='input-section'>
//       <input className='input-field' onChange={handleNumberChange} />
//       <button className='roll-button' onClick={rollDice}>Roll</button>
//     </div>
//     {diceResults.length > 0 && (
//       <div className='dice-container'>{renderDiceInRows()}</div>
//     )}
//   </div>
// </>

// CORE LOGIC --> rollDice, handleNumberChange, renderDiceInRows, renderDie
// i) rollDice generates random numbers for each die
// ii) handleNumberChange validates and updates number of dice
// iii) renderDiceInRows creates visual dice layout in rows of 3
// iv) renderDie creates individual visual die with dot patterns

// for rollDice -->
// i) create empty results array
// ii) loop from 0 to numberOfDice
// iii) for each iteration: generate random number (1-6) using Math.floor(Math.random() * 6) + 1
// iv) push each random number to results array
// v) setDiceResults(results) to update state with visual dice values

// for handleNumberChange -->
// i) extract value from e.target.value
// ii) convert to integer using parseInt(value)
// iii) validate: if value >= 1 && value <= 12
// iv) if valid: setNumberOfDice(value)
// v) if invalid: do nothing (ignore the input)

// for renderDiceInRows -->
// i) create empty rows array to hold JSX elements
// ii) loop through diceResults in chunks of 3 (i += 3)
// iii) for each chunk: use slice(i, i + 3) to get maximum 3 dice values
// iv) create a div with 'dice-row' className for each row
// v) map through rowDice and call renderDie(value, i + index) for each die
// vi) push each row JSX to rows array
// vii) return all rows as JSX elements

// for renderDie -->
// i) accept value (1-6) and index as parameters
// ii) return JSX structure for single die:
//     - outer div with 'die' className
//     - inner div with 'dots' and 'dots-{value}' classNames
//     - Array.from to create dot elements based on dice value
// iii) use Array.from({ length: value }, (_, i) => ...) to create exact number of dots
// iv) each dot gets 'dot' and 'dot-{i + 1}' classNames for CSS positioning

// VISUAL DICE LOGIC:

// Array.from explanation for dots creation
// Array.from({ length: value }, (_, i) => ...)
// i) Creates array with 'value' number of elements (e.g., value=3 creates [undefined, undefined, undefined])
// ii) Maps each element to a JSX dot element
// iii) First parameter (_) is array element (ignored), second (i) is index (0, 1, 2...)
// iv) Returns array of dot JSX elements: [<div className="dot dot-1">, <div className="dot dot-2">, ...]

// CSS className structure for dice
// i) 'die' className ---> styles the outer die container (white square with border)
// ii) 'dots' className ---> styles the inner dots container (60x60 positioning area)
// iii) 'dots-{value}' className ---> specific positioning for that dice value (dots-1, dots-2, etc.)
// iv) 'dot' className ---> styles individual dots (12px black circles)
// v) 'dot-{i + 1}' className ---> specific positioning for each dot within the pattern

// CONDITIONAL RENDERING LOGIC:
// i) Dice container only shows when diceResults.length > 0
// ii) This means visual dice only appear after first roll
// iii) Each subsequent roll updates the displayed visual dice
// iv) Uses && operator for conditional rendering

// ROWS OF 3 LOGIC BREAKDOWN:
// Example with 8 dice: diceResults = [1, 3, 5, 2, 6, 4, 1, 2]
// 
// First iteration: i = 0
// rowDice = diceResults.slice(0, 3) = [1, 3, 5]  ---> Row 1: 3 visual dice
// 
// Second iteration: i = 3  
// rowDice = diceResults.slice(3, 6) = [2, 6, 4]  ---> Row 2: 3 visual dice
// 
// Third iteration: i = 6
// rowDice = diceResults.slice(6, 9) = [1, 2]     ---> Row 3: 2 visual dice (remaining)

// VISUAL DICE PATTERNS EXPLAINED:
// i) Value 1: Single center dot ---> Array.from creates 1 dot with 'dot-1' class
// ii) Value 2: Two diagonal dots ---> Array.from creates 2 dots with 'dot-1' and 'dot-2' classes
// iii) Value 3: Three diagonal dots ---> Array.from creates 3 dots with 'dot-1', 'dot-2', 'dot-3' classes
// iv) Value 4: Four corner dots ---> Array.from creates 4 dots with respective classes
// v) Value 5: Four corners + center ---> Array.from creates 5 dots with respective classes
// vi) Value 6: Two columns of three ---> Array.from creates 6 dots with respective classes

// STATE MANAGEMENT FLOW:
// i) User enters number of dice -> handleNumberChange -> validate and update numberOfDice
// ii) User clicks roll -> rollDice -> generate random results -> update diceResults
// iii) Component re-renders -> renderDiceInRows -> calls renderDie for each value
// iv) renderDie -> creates visual die JSX with dots -> displays on screen

// CSS DEPENDENCY:
// i) Component relies on external CSS classes for visual appearance
// ii) JavaScript creates structure, CSS creates visual styling
// iii) className attributes connect JavaScript elements to CSS rules
// iv) Without CSS, dice would be unstyled div elements with text

// VISUAL RENDERING PROCESS:
// i) diceResults array holds numerical values: [1, 3, 5]
// ii) renderDiceInRows splits into rows of 3
// iii) renderDie converts each number to visual die with dots
// iv) CSS positions dots according to traditional dice patterns
// v) Final result: visual dice that look like real dice with dot patterns