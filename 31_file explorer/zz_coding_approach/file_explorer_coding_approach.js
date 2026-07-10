// DATA STRUCTURE (folderData.js)
// ============================================

// Tree node format:
// {
//   id: string,
//   name: string,
//   isFolder: boolean,
//   items: [] // array of child nodes
// }

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State: explorerData → useState(explorer)
// → Entire folder tree structure
// → Root node with nested items

// Custom hook: useTraverseTree()
// → Returns { insertNode, deleteNode, renameNode }
// → insertNode function used for adding files/folders

// handleInsertNode function:
// → Parameters: (folderId, item, isFolder)
// → Calls insertNode from hook
// → Updates explorerData with new tree
// → setExplorerData(finalTree)

// ============================================
// FOLDER.JSX - STATE MANAGEMENT
// ============================================

// State 1: expand → useState(false)
// → Controls folder open/closed state
// → true: show children, false: hide children

// State 2: showInput → useState({ visible: false, isFolder: false })
// → visible: show/hide input field
// → isFolder: determine if adding folder or file

// Props:
// → handleInsertNode: callback from parent
// → explorer: current node data

// ============================================
// FOLDER.JSX - HANDLERS
// ============================================

// handleNewFolder(e, isFolder):
// → e.stopPropagation() - prevent folder collapse
// → setExpand(true) - open folder
// → setShowInput({ visible: true, isFolder })

// onAddFolder(e):
// → if (e.keyCode === 13 && e.target.value) - Enter key pressed
// → handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
// → setShowInput({ ...showInput, visible: false })

// ============================================
// FOLDER.JSX - CONDITIONAL RENDERING
// ============================================

// If explorer.isFolder === true:
// → Render folder with expand/collapse
// → Show "Folder +" and "File +" buttons
// → Conditionally show input field (showInput.visible)
// → Recursively render children: explorer.items.map()

// If explorer.isFolder === false:
// → Render file (leaf node)
// → <span className='file'>📄 {explorer.name}</span>

// ============================================
// USETRAVERSE HOOK - INSERTNODE LOGIC
// ============================================

// insertNode(tree, folderId, item, isFolder):

// Base case:
// → if (tree.id === folderId && tree.isFolder)
// → Found target folder
// → tree.items.unshift({ new node object })
// → Adds to beginning of items array
// → return tree

// Recursive case:
// → let latestNode = tree.items.map((ob) => insertNode(ob, ...))
// → Recursively search each child
// → return { ...tree, items: latestNode }
// → Return updated tree with modified children

// New node structure:
// {
//   id: new Date().getTime(),
//   name: item,
//   isFolder: isFolder,
//   items: []
// }

// ============================================
// FOLDER.JSX - JSX STRUCTURE (FOLDER VIEW)
// ============================================

// Outer div:
// → marginTop: 5

// Folder header:
// → onClick={() => setExpand(!expand)} - toggle expand
// → className='folder'
// → Display: 📁 {explorer.name}
// → Buttons for "Folder +" and "File +"

// Children container:
// → style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}
// → Conditional display based on expand state
// → Indented with paddingLeft

// Input field (conditional):
// → {showInput.visible && <div>...</div>}
// → Shows folder/file icon based on showInput.isFolder
// → <input autoFocus onKeyDown={onAddFolder} onBlur={hide} />
// → onBlur hides input when clicking outside

// Recursive children:
// → {explorer.items.map((exp) => <Folder ... />)}
// → Passes handleInsertNode down
// → key={exp.id}
// → explorer={exp} for each child

// ============================================
// KEY CONCEPTS
// ============================================

// Recursive component → Folder renders itself for nested structure
// Tree traversal → Recursively search tree to find target node
// .unshift() → Add to beginning of array
// e.stopPropagation() → Prevent event bubbling to parent
// e.keyCode === 13 → Detect Enter key press
// onBlur → Triggered when input loses focus
// autoFocus → Automatically focus input when shown
// Conditional rendering → Different JSX for folders vs files
// Immutable update → {...tree, items: latestNode} creates new object
// Base case + recursive case → Standard recursion pattern
// paddingLeft for indentation → Visual hierarchy of nested items
// new Date().getTime() → Generate unique ID with timestamp
// Tree data structure → Nested objects with items array