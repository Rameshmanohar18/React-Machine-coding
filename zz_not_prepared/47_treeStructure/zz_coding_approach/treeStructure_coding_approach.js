// ========== WHAT WE'RE TRYING TO DO ==========
// We want to turn this nested object structure:
const exampleObj = {
  taxi: 'a car licensed to transport passengers in return for payment of a fare',
  food: {
    sushi: 'a traditional Japanese dish of prepared rice...',
    apple: {
      Honeycrisp: 'an apple cultivar developed at the MAES...',
      Fuji: 'an apple cultivar developed by growers...',
    },
  },
};

// Into a visual tree that looks like:
// taxi: a car licensed to transport passengers in return for payment of a fare
// food:
//   sushi: a traditional Japanese dish of prepared rice...
//   apple:
//     Honeycrisp: an apple cultivar developed at the MAES...
//     Fuji: an apple cultivar developed by growers...

// ========== CODING APPROACH ==========
// Inside Component.jsx, we are creating a recursive tree renderer

// Step 2: Create treeStructure function - this is the heart of our tree renderer
const treeStructure = (object = {}) => (
  <div className='tree-container'>
    {/* Step (i): Get all the keys from current object level */}
    {Object.keys(object).map((ele) => (
      <>
        {/* Step (ii): Check if current key's value is a string */}
        {typeof object[ele] === 'string' && (
          <span className='tree-label'>
            {/* Display as "key: value" format */}
            {ele}: {object[ele]}
          </span>
        )}
        <br></br>

        {/* Step (iii): Check if current key's value is an object (nested data) */}
        {typeof object[ele] === 'object' && (
          <>
            {/* Display just the key name followed by colon */}
            <div className='tree-nestedobject'>{ele}:</div>

            {/* Step (iv): RECURSIVELY call treeStructure with the nested object */}
            {treeStructure(object[ele])}
          </>
        )}
      </>
    ))}
  </div>
);

// Step 3: Return JSX that starts the recursive rendering process
return <div className='main'>{treeStructure(exampleObj)}</div>;

// ========== HOW THE RECURSION WORKS STEP BY STEP ==========

// FIRST CALL: treeStructure(exampleObj)

// ========== WHY THIS IS USEFUL ==========
// This pattern is commonly used for:
// 1. JSON data viewers/explorers
// 2. Configuration file displays
// 3. API response visualization
// 4. Nested menu structures
// 5. File/folder tree displays
// 6. Any hierarchical data representation

// The CSS classes (tree-container, tree-label, tree-nestedobject) would provide:
// - Indentation for nested levels
// - Different styling for keys vs values
// - Visual hierarchy through colors/fonts
