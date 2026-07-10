// Inside App.jsx, we are maintaining Calculator.jsx
// Step 1: Inside Calculator.jsx, we will start with useState variables declaration

// Ex: The very first useState variable
// This holds the number user is currently typing - starts with "0"
const [input, setInput] = useState('0');

// The second useState variable will be related to storing the first number in calculation
// This remembers the first number when user clicks an operator - starts as null
const [previousInput, setPreviousInput] = useState(null);

// The third useState variable will be related to storing which operation to perform
// This remembers if user clicked +, -, *, or / - starts as null
const [operator, setOperator] = useState(null);

// The fourth useState variable will be related to what shows on calculator screen
// This is what user sees on the calculator display - starts with "0"
const [display, setDisplay] = useState('0');

// Step 2: handleDigit function, this runs when user clicks number buttons (0-9 or .)
// Ex: when user clicks "5" button
const handleDigit = (digit) => {
  // Step (i): If current input is "0" and user clicks a digit, replace it
  // If current input is something else, add the digit to the end
  const newInput = input === '0' ? String(digit) : input + digit;
  setInput(newInput);

  // Step (ii): Update display to show either just the number or full expression
  setDisplay(
    previousInput && operator
      ? `${previousInput} ${operator} ${newInput}` // Shows "5 + 3" format
      : newInput // Shows just "3"
  );
};

// Step 3: handleOperation function, this runs when user clicks +, -, *, / buttons
// Ex: when user clicks "+" button
const handleOperation = (op) => {
  // Step (i): Check if we're starting a new calculation or continuing one
  if (!previousInput || input !== '0') {
    // Step (ii): If there's already a pending operation, calculate it first
    if (previousInput && operator) {
      calculateResult(op, true); // Calculate and chain to next operation
    } else {
      // Step (iii): Start a new operation
      setPreviousInput(input); // Save current number as "first number"
      setOperator(op); // Remember which operation
      setInput('0'); // Reset input for next number
      setDisplay(`${input} ${op}`); // Show "5 +" on display
    }
  } else {
    // Step (iv): User is just changing their mind about the operator
    setOperator(op);
    setDisplay(`${previousInput} ${op}`);
  }
};

// Step 4: calculateResult function, this runs when user clicks "=" or chains operations
// Ex: when user has typed "5 + 3" and clicks "="
const calculateResult = (newOperator = null, chaining = false) => {
  // Step (i): Check if we have everything needed for calculation
  if (operator && previousInput) {
    // Step (ii): Convert strings to numbers for math
    const currentInput = parseFloat(input); // "3" becomes 3
    const previous = parseFloat(previousInput); // "5" becomes 5
    let result;

    // Step (iii): Perform the actual calculation based on operator
    switch (operator) {
      case '+':
        result = previous + currentInput; // 5 + 3 = 8
        break;
      case '-':
        result = previous - currentInput; // 5 - 3 = 2
        break;
      case '*':
        result = previous * currentInput; // 5 * 3 = 15
        break;
      case '/':
        result = previous / currentInput; // 5 / 3 = 1.666...
        break;
      default:
        return;
    }

    // Step (iv): Handle result based on whether user is chaining operations
    if (chaining && newOperator) {
      // User typed "5 + 3 +" (wants to continue calculating)
      setPreviousInput(String(result)); // 8 becomes the new first number
      setOperator(newOperator); // + becomes the new operator
      setInput('0'); // Ready for next number
      setDisplay(`${result} ${newOperator}`); // Shows "8 +"
    } else {
      // User clicked "=" (final result)
      setInput(String(result)); // 8 becomes the input
      setPreviousInput(null); // Clear first number
      setOperator(null); // Clear operator
      setDisplay(String(result)); // Shows just "8"
    }
  }
};

// Step 5: clearAll function, this runs when user clicks "AC" button
// Ex: resets everything back to starting state
const clearAll = () => {
  setInput('0');
  setPreviousInput(null);
  setOperator(null);
  setDisplay('0');
};

// Step 6: Return JSX structure
// Display div that shows the current display state
// Buttons grid with AC, operators, digits, and equals
// Each button calls appropriate function when clicked

