// Import React and useState hook, and the stylesheet for the app
import React, { useState } from 'react';
import '../App.css';

// Define the Calculator component as a functional component
const Calculator = () => {
  // State to store the current input value
  const [input, setInput] = useState('0');

  // State to store the value before performing an operation
  const [previousInput, setPreviousInput] = useState(null);

  // State to store the current operator
  const [operator, setOperator] = useState(null);

  // State to show what user is selecting (Ex: 9 + 8)
  const [display, setDisplay] = useState('0');

  // Function to handle digit input
  const handleDigit = (digit) => {
    // If the current input is "0" and digit "9" is pressed, input becomes "9".
    //  If the input is "3" and digit "4" is pressed next, the input becomes "34".
    const newInput = input === '0' ? String(digit) : input + digit;
    setInput(newInput);

    // updates the display to show the full expression or just the new input
    setDisplay(
      previousInput && operator
        ? `${previousInput} ${operator} ${newInput}`
        : newInput
    );
  };

  const handleOperation = (op) => {
    // If there is no previous input or the input is not "0", set up for a new operation
    if (!previousInput || input !== '0') {
      // Calculate the result first if there is a pending operation
      if (previousInput && operator) {
        calculateResult(op, true); // Pass 'true' to indicate chaining operations
      } else {
        // Set up a new operation
        setPreviousInput(input);
        setOperator(op);
        setInput('0');
        setDisplay(`${input} ${op}`);
      }
    } else {
      // Just change the operator if input is "0" (user changes their mind about the operation)
      setOperator(op);
      setDisplay(`${previousInput} ${op}`);
    }
  };

  const calculateResult = (newOperator = null, chaining = false) => {
    if (operator && previousInput) {
      const currentInput = parseFloat(input);
      const previous = parseFloat(previousInput);
      let result;

      switch (operator) {
        case '+':
          result = previous + currentInput;
          break;
        case '-':
          result = previous - currentInput;
          break;
        case '*':
          result = previous * currentInput;
          break;
        case '/':
          result = previous / currentInput;
          break;
        default:
          return;
      }

      // Handle chaining operations
      if (chaining && newOperator) {
        setPreviousInput(String(result));
        setOperator(newOperator);
        setInput('0');
        setDisplay(`${result} ${newOperator}`);
      } else {
        // Final calculation, not chaining further
        setInput(String(result));
        setPreviousInput(null);
        setOperator(null);
        setDisplay(String(result));
      }
    }
  };


  const clearAll = () => {
    setInput('0');
    setPreviousInput(null);
    setOperator(null);
    setDisplay('0');
  };

  return (
    <div className='calculator'>
      <div className='display'>{display}</div>
      <div className='buttons'>
        <button onClick={clearAll}>AC</button>
        {['%', '/', '*', '-', '+'].map((op) => (
          <button key={op} onClick={() => handleOperation(op)}>
            {op.replace('*', '×').replace('/', '÷')}
          </button>
        ))}
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map(
          (digit) => (
            <button key={digit} onClick={() => handleDigit(digit)}>
              {digit}
            </button>
          )
        )}
        <button onClick={() => calculateResult()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
