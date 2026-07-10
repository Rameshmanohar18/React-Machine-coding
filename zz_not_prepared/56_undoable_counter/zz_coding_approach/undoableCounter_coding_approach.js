// Inside Counter.jsx, I will be writing all the main logic

// Step 1:

// Operations: '/2', '-1', '+1', 'x2' apply respective operations to current count
// Undo: reverts the last action and updates count
// Redo: applies the last undone action (if any)
// Reset: resets counter to 0 and clears all history

// Step 2: I will be maintaining three state variables

// State 1: useState ---> count ---> Ex: 0 is my defaultValue (current counter value)
// State 2: useState ---> history ---> Ex: [] empty array (stores all performed operations)
// State 3: useState ---> undoHistory ---> Ex: [] empty array (stores undone operations for redo)

// Step 3: Core Logic Functions

// CORE LOGIC 1: performOperation function (helper function)
function performOperation(counter, operation) {
  switch (operation) {
    case '/2':
      return counter / 2;
    case '-1':
      return counter - 1;
    case '+1':
      return counter + 1;
    case 'x2':
      return counter * 2;
    default:
      return counter;
  }
}

// CORE LOGIC 2: handleOperation function (main operation handler)
const handleOperation = (operation) => {
  // Ex: count = 5, operation = 'x2'
  const oldCount = count; // oldCount = 5

  // performOperation(5, 'x2') returns 10
  const newCount = performOperation(count, operation); // newCount = 10

  // Updates counter display to 10
  setCount(newCount);

  // Adds new entry to front: [{ operation: 'x2', before: 5, after: 10 }, ...existingHistory]
  setHistory([{ operation, before: oldCount, after: newCount }, ...history]);

  // Clears redo options when new operation performed
  setUndoHistory([]);
};

// CORE LOGIC 3: undo function
const undo = () => {
  if (history.length > 0) {
    // Ex: history = [{ operation: 'x2', before: 5, after: 10 }, { operation: '+1', before: 4, after: 5 }]
    // latest = { operation: 'x2', before: 5, after: 10 }
    // restHistory = [{ operation: '+1', before: 4, after: 5 }]
    const [latest, ...restHistory] = history;

    // Restores counter to value before last operation: 10 → 5
    setCount(latest.before);

    // Removes last operation from history: keeps [{ operation: '+1', before: 4, after: 5 }]
    setHistory(restHistory);

    // Saves undone operation for redo: [{ operation: 'x2', before: 5, after: 10 }, ...existingUndoHistory]
    setUndoHistory([latest, ...undoHistory]);
  }
};

// CORE LOGIC 4: redo function
const redo = () => {
  if (undoHistory.length > 0) {
    // Ex: undoHistory = [{ operation: 'x2', before: 5, after: 10 }, { operation: '+1', before: 4, after: 5 }]
    // latest = { operation: 'x2', before: 5, after: 10 }
    // restUndoHistory = [{ operation: '+1', before: 4, after: 5 }]
    const [latest, ...restUndoHistory] = undoHistory;

    // Applies the operation again: 5 → 10
    setCount(latest.after);

    // Removes from undo stack: keeps [{ operation: '+1', before: 4, after: 5 }]
    setUndoHistory(restUndoHistory);

    // Adds back to history: [{ operation: 'x2', before: 5, after: 10 }, ...existingHistory]
    setHistory([latest, ...history]);
  }
};

// CORE LOGIC 5: reset function
const reset = () => {
  setCount(0);
  setHistory([]);
  setUndoHistory([]);
};

// Step 4: JSX Structure

// i) Main div container
// ii) h1 element showing "Counter: {count}"
// iii) First button group div with operation buttons (/2, -1, +1, x2)
// iv) Second button group div with control buttons (Undo, Redo, Reset)
// v) History section with h2 title and table

// Operation buttons onClick={() => handleOperation('OPERATION_TYPE')}
// Control buttons: onClick={undo/redo/reset} with proper disabled conditions

// Step 5: History Table Logic

// Table structure: Operation | Before | After
// Data source: history array (shows most recent operations first)
// Each history entry: { operation: '/2', before: 5, after: 2.5 }

{
  history.map((entry, index) => (
    <tr key={index}>
      <td>{entry.operation}</td>
      <td>{entry.before}</td>
      <td>{entry.after}</td>
    </tr>
  ));
}

// Step 6: Button Disabled Logic

// Undo button: disabled={history.length === 0}
// Redo button: disabled={undoHistory.length === 0}
// Reset button: always enabled

// Step 7: Key Implementation Notes

// - Use array destructuring for undo/redo: const [latest, ...rest] = array
// - Always clear undoHistory when performing new operations
// - History stores operations in reverse chronological order (newest first)
// - Each history entry contains: operation name, before value, after value

// FOR UI Logic: Use margin for button spacing, border-collapse for table, disabled states for buttons

// In HTML tables:

/* 
<table> - the table container
<tr> - table row
<th> - table header (column titles)
<td> - table data (actual content cells)
*/
