// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → passes namesArray to <NamesList />
// NamesList.jsx → groups and displays names by first letter

// ============================================
// STATE MANAGEMENT
// ============================================

// NO STATE NEEDED
// → Pure functional component
// → Props: { names } array of strings

// ============================================
// GROUPNAMESBYLETTER FUNCTION
// ============================================

// Purpose: Transform flat array into grouped object by first letter

// Logic:
// → names.reduce((acc, name) => {...}, {})
// → Accumulator starts as empty object {}

// For each name:
// → Get first letter: name[0].toUpperCase()
// → Check if acc[firstLetter] exists
// → If not exists: acc[firstLetter] = [name] (create new array)
// → If exists: acc[firstLetter].push(name) (append to existing)
// → Return acc

// Example transformation:
// Input: ['Ava', 'Anthony', 'Baddon']
// Output: {
//   A: ['Ava', 'Anthony'],
//   B: ['Baddon']
// }

// ============================================
// JSX STRUCTURE
// ============================================

// groupedNames object created:
// → const groupedNames = groupNamesByLetter(names)

// Outer loop - iterate over letters:
// → Object.keys(groupedNames) returns ['A', 'B', 'C']
// → .map((letter) => ...) for each letter

// For each letter:
// → <div key={letter}> wrapper
// → Letter heading: <div className='letter-group'>{letter}</div>
// → Inner loop: groupedNames[letter].map((name) => ...)
//   - Displays each name under that letter
//   - <div key={name} className='name'>{name}</div>

// ============================================
// KEY CONCEPTS
// ============================================

// .reduce() → Transform array into object (accumulator pattern)
// name[0] → Access first character of string
// .toUpperCase() → Convert to uppercase for grouping
// Object.keys() → Get array of object keys (letters)
// Nested .map() → Outer loop (letters), inner loop (names per letter)
// Accumulator pattern → Build object incrementally in reduce
// acc[key] = [] vs acc[key].push() → Initialize vs append
// Grouped data structure → Object with letters as keys, arrays as values
// No state needed → Pure transformation of props