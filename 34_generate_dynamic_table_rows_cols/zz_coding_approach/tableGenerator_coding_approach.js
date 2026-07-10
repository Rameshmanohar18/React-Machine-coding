// Inside TableGenerator.jsx, I will be writing table generation logic

// Step 1: I'm building a dynamic table generator based on user input

// User enters rows and columns in input fields
// When "Generate Table" clicked, creates table with sequential numbers 1 to (rows x columns)
// Reset button clears inputs and hides table

// Step 2: I will be maintaining three state variables

// State 1: useState ---> rows ---> Ex: '' is my defaultValue (user input for number of rows)
// State 2: useState ---> columns ---> Ex: '' is my defaultValue (user input for number of columns)
// State 3: useState ---> showTable ---> Ex: false is my defaultValue (controls table visibility)

// Step 3: Core Logic Functions

// CORE LOGIC 1: handleSubmit function (simple validation)
const handleSubmit = () => {
  if (rows && columns) {
    setShowTable(true);
  }
};

// CORE LOGIC 2: resetTable function (clears all state)
const resetTable = () => {
  setRows('');
  setColumns('');
  setShowTable(false);
};

// CORE LOGIC 3: generateTable function (complex nested loop logic)
const generateTable = () => {
  const tableRows = [];
  let counter = 1;

  for (let i = 0; i < parseInt(rows); i++) {
    const tableCells = [];
    for (let j = 0; j < parseInt(columns); j++) {
      tableCells.push(<td key={j}>{counter}</td>);
      counter++;
    }
    tableRows.push(<tr key={i}>{tableCells}</tr>);
  }
  return tableRows;
};

// EXAMPLE: generateTable() with rows=3, columns=4
// INPUT: rows='3', columns='4'
// STEP 1: tableRows = [], counter = 1

// ITERATION 1 (i=0, Row 1):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{1}</td>), counter = 2
// j=1: tableCells.push(<td key={1}>{2}</td>), counter = 3
// j=2: tableCells.push(<td key={2}>{3}</td>), counter = 4
// j=3: tableCells.push(<td key={3}>{4}</td>), counter = 5
// tableCells = [<td>1</td>, <td>2</td>, <td>3</td>, <td>4</td>]
// tableRows.push(<tr key={0}>{tableCells}</tr>)

// ITERATION 2 (i=1, Row 2):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{5}</td>), counter = 6
// j=1: tableCells.push(<td key={1}>{6}</td>), counter = 7
// j=2: tableCells.push(<td key={2}>{7}</td>), counter = 8
// j=3: tableCells.push(<td key={3}>{8}</td>), counter = 9
// tableCells = [<td>5</td>, <td>6</td>, <td>7</td>, <td>8</td>]
// tableRows.push(<tr key={1}>{tableCells}</tr>)

// ITERATION 3 (i=2, Row 3):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{9}</td>), counter = 10
// j=1: tableCells.push(<td key={1}>{10}</td>), counter = 11
// j=2: tableCells.push(<td key={2}>{11}</td>), counter = 12
// j=3: tableCells.push(<td key={3}>{12}</td>), counter = 13
// tableCells = [<td>9</td>, <td>10</td>, <td>11</td>, <td>12</td>]
// tableRows.push(<tr key={2}>{tableCells}</tr>)

// FINAL OUTPUT:
// tableRows = [
//   <tr key={0}>[<td>1</td>, <td>2</td>, <td>3</td>, <td>4</td>]</tr>,
//   <tr key={1}>[<td>5</td>, <td>6</td>, <td>7</td>, <td>8</td>]</tr>,
//   <tr key={2}>[<td>9</td>, <td>10</td>, <td>11</td>, <td>12</td>]</tr>
// ]

// Step 4: JSX Structure

// i) Main div with className "container"
// ii) h1 element with "Table Generator" title
// iii) Form container div with input fields for rows and columns
// iv) Input fields with onChange handlers: onChange={(e) => setRows(e.target.value)}
// v) Generate button with onClick={handleSubmit}
// vi) Conditional rendering: {showTable && <div>...</div>}
// vii) Table structure: <table><tbody>{generateTable()}</tbody></table>
// viii) Reset button with onClick={resetTable}

// Step 5: Input Handling Logic

// Input onChange: (e) => setRows(e.target.value) captures user input
// Button validation: if (rows && columns) checks both fields have values
// parseInt(rows) converts string input to number for loop iterations

// Step 6: Key Implementation Notes

// - Use parseInt() to convert string inputs to numbers for loops
// - Nested loops: outer loop creates rows, inner loop creates cells per row
// - Counter increments continuously across all cells (1, 2, 3... up to rows*columns)
// - Each cell gets unique key prop for React reconciliation
// - Conditional rendering shows/hides table based on showTable state
// - Reset function clears all state back to initial values

// FOR UI Logic: Use className for CSS styling, min='1' for input validation, type='number' for numeric inputs
