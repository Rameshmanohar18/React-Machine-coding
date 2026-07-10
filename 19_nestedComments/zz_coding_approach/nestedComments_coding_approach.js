// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Root component with comment tree state
// Comment.jsx → Recursive component rendering comments/replies
// Action.jsx → Simple button wrapper component
// useNode.js → Custom hook with tree manipulation logic
// Assets: UpArrow.jsx, DownArrow.jsx → SVG icons

// ============================================
// DATA STRUCTURE (TREE)
// ============================================

// Comment structure:
// → { id: number, name: string, items: array }

// Root comment:
// → { id: 1, items: [] }
// → id: 1 is special (initial input, not a comment)
// → items: array of child comments

// Nested comment example:
// {
//   id: 1,
//   items: [
//     {
//       id: 1634567890123,
//       name: 'First comment',
//       items: [
//         { id: 1634567891234, name: 'Reply to first', items: [] },
//         { id: 1634567892345, name: 'Another reply', items: [] }
//       ]
//     }
//   ]
// }

// Tree structure: Each comment can have nested replies infinitely deep

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// Initial data:
// → const comments = { id: 1, items: [] }
// → Root node with empty replies array

// State: commentsData → useState(comments)
// → Stores entire comment tree
// → Single source of truth for all comments

// Custom hook: useNode()
// → const { insertNode, editNode, deleteNode } = useNode()
// → Three utility functions for tree manipulation

// ============================================
// APP.JSX - HANDLER FUNCTIONS
// ============================================

// handleInsertNode function:
// → Accepts: (commentId, item)
// → commentId: parent comment where reply is added
// → item: text content of new reply

// Logic:
// → const finalStructure = insertNode(commentsData, commentId, item)
// → Calls insertNode utility with current tree, target id, new text
// → setCommentsData(finalStructure)
// → Updates state with modified tree

// handleEditNode function:
// → Accepts: (commentId, value)
// → commentId: comment being edited
// → value: new text content

// Logic:
// → const finalStructure = editNode(commentsData, commentId, value)
// → Calls editNode utility
// → setCommentsData(finalStructure)

// handleDeleteNode function:
// → Accepts: (commentId)
// → commentId: comment to delete

// Logic:
// → const finalStructure = deleteNode(commentsData, commentId)
// → Calls deleteNode utility
// → setCommentsData({ ...finalStructure })
// → Spread operator ensures React detects change

// ============================================
// APP.JSX - RENDERING
// ============================================

// Render single Comment component:
// → Props passed:
//   - handleInsertNode={handleInsertNode}
//   - handleEditNode={handleEditNode}
//   - handleDeleteNode={handleDeleteNode}
//   - comment={commentsData}

// Why pass root?
// → Comment component recursively renders itself
// → Starting with root renders entire tree

// ============================================
// COMMENT.JSX - STATE MANAGEMENT
// ============================================

// State 1: input → useState('')
// → Stores text for new comment/reply
// → Used in input fields

// State 2: editMode → useState(false)
// → Boolean tracking if comment is being edited
// → Changes UI to show Save/Cancel instead of Reply/Edit/Delete

// State 3: showInput → useState(false)
// → Boolean controlling reply input visibility
// → Shows/hides input field for adding reply

// State 4: expand → useState(false)
// → Boolean controlling visibility of replies
// → Expands/collapses nested comments

// Ref: inputRef → useRef(null)
// → References editable span element
// → Used to focus on edit mode
// → Access edited text via innerText

// ============================================
// COMMENT.JSX - useEffect
// ============================================

// Dependency: [editMode]
// → Runs when editMode changes

// Logic:
// → inputRef?.current?.focus()
// → Auto-focuses span when entering edit mode
// → Optional chaining prevents errors if ref not set

// ============================================
// COMMENT.JSX - handleNewComment
// ============================================

// Purpose: Handle Reply button click

// Logic:
// → setExpand(!expand)
// → Toggle expansion (show/hide replies)
// → setShowInput(true)
// → Show input field for typing reply

// ============================================
// COMMENT.JSX - onAddComment
// ============================================

// Purpose: Handle adding new comment or saving edit

// Two modes: edit or add reply

// EDIT MODE (editMode is true):
// → handleEditNode(comment.id, inputRef?.current?.innerText)
// → Gets edited text from span's innerText
// → Calls parent's edit handler

// ADD REPLY MODE (editMode is false):
// → setExpand(true)
// → Ensure replies are visible
// → handleInsertNode(comment.id, input)
// → Adds new reply to current comment
// → setShowInput(false), setInput('')
// → Hide input and clear text

// After both:
// → if (editMode) setEditMode(false)
// → Exit edit mode if was editing

// ============================================
// COMMENT.JSX - HANDLEDELETE
// ============================================

// Purpose: Delete current comment

// Logic:
// → handleDeleteNode(comment.id)
// → Calls parent's delete handler with comment's id

// ============================================
// COMMENT.JSX - JSX STRUCTURE
// ============================================

// Main wrapper: outer div

// SECTION 1: Comment display container
// → div with dynamic className:
//   - 'inputContainer' if comment.id === 1 (root)
//   - 'commentContainer' otherwise

// Conditional rendering: {comment.id === 1 ? ... : ...}

// IF ROOT (id === 1):

// Input field:
// → type='text'
// → autoFocus
// → value={input}
// → onChange={(e) => setInput(e.target.value)}
// → placeholder='type...'

// Action button:
// → type='COMMENT'
// → handleClick={onAddComment}

// ELSE (nested comment):

// Comment text display:
// → span element with:
//   - contentEditable={editMode}
//   - Makes span editable when editMode true
//   - suppressContentEditableWarning={editMode}
//   - Prevents React warning about children in editable element
//   - ref={inputRef}
//   - Access for reading edited text
//   - Display: {comment.name}

// Actions container:
// → div with styles

// IF EDIT MODE:

// Save button:
// → Action with type='SAVE'
// → handleClick={onAddComment}
// → Saves edited text

// Cancel button:
// → Action with type='CANCEL'
// → handleClick resets text and exits edit mode:
//   - if (inputRef.current) inputRef.current.innerText = comment.name
//   - setEditMode(false)

// ELSE (normal mode):

// Reply button:
// → Action with dynamic icon:
//   - Shows UpArrow if expand is true
//   - Shows DownArrow if expand is false
//   - Text: 'REPLY'
// → handleClick={handleNewComment}

// Edit button:
// → Action with type='EDIT'
// → handleClick={() => setEditMode(true)}

// Delete button:
// → Action with type='DELETE'
// → handleClick={handleDelete}

// SECTION 2: Replies container
// → div with conditional display:
//   - display: expand ? 'block' : 'none'
//   - paddingLeft: 25 (indent replies)

// Reply input (conditional):
// → {showInput && ...}

// Input field:
// → type='text'
// → autoFocus
// → onChange={(e) => setInput(e.target.value)}

// Reply action button:
// → type='REPLY'
// → handleClick={onAddComment}

// Cancel action button:
// → type='CANCEL'
// → handleClick logic:
//   - setShowInput(false)
//   - if (!comment?.items?.length) setExpand(false)
//   - Collapse if no existing replies

// Recursive comment rendering:
// → {comment?.items?.map((cmnt) => ...)}
// → Map over items (child comments)

// For each child:
// → <Comment
//     key={cmnt.id}
//     handleInsertNode={handleInsertNode}
//     handleEditNode={handleEditNode}
//     handleDeleteNode={handleDeleteNode}
//     comment={cmnt}
//   />
// → Recursively renders Comment component
// → Passes same handlers down
// → Passes child comment as prop

// ============================================
// ACTION.JSX - SIMPLE WRAPPER
// ============================================

// Purpose: Reusable clickable element

// Props: { handleClick, type, className }

// Returns:
// → div with className={className}
// → onClick={handleClick}
// → Display: {type}

// Why separate component?
// → Reusability across different action buttons
// → Consistent styling via className

// ============================================
// useNode HOOK - insertNode FUNCTION
// ============================================

// Purpose: Add new reply to tree

// Accepts: (tree, commentId, item)
// → tree: current comment tree structure
// → commentId: parent comment id
// → item: new reply text

// Recursive logic:

// BASE CASE: if (tree.id === commentId)
// → Found the parent comment

// Action:
// → tree.items.push({ id: Date.now(), name: item, items: [] })
// → Add new comment object to parent's items array
// → id: Date.now() creates unique timestamp
// → name: reply text
// → items: empty array for nested replies
// → return tree

// RECURSIVE CASE: else
// → Search child comments

// Logic:
// → let latestNode = tree.items.map((ob) => insertNode(ob, commentId, item))
// → Recursively call insertNode on each child
// → Each child returns updated version
// → return { ...tree, items: latestNode }
// → Return tree with updated items array

// Example flow:
// → Looking for commentId in nested structure
// → If current node matches → add reply here
// → If not → check all children recursively
// → Rebuild tree from bottom up with new reply

// ============================================
// useNode HOOK - EDITNODE FUNCTION
// ============================================

// Purpose: Update comment text

// Accepts: (tree, commentId, value)
// → tree: comment tree
// → commentId: comment to edit
// → value: new text

// Recursive logic:

// BASE CASE: if (tree.id === commentId)
// → Found comment to edit
// → tree.name = value
// → Update comment text
// → return tree

// RECURSIVE CASE: else
// → Search children
// → tree.items.map((ob) => editNode(ob, commentId, value))
// → Recursively search and edit
// → return { ...tree }
// → Return updated tree

// Note: map doesn't reassign items, relies on mutation
// Spread operator creates new object reference for React

// ============================================
// useNode HOOK - DELETENODE FUNCTION
// ============================================

// Purpose: Remove comment from tree

// Accepts: (tree, id)
// → tree: comment tree
// → id: comment to delete

// Iterative + recursive approach:

// Loop through items:
// → for (let i = 0; i < tree.items.length; i++)

// For each item:
// → const currentItem = tree.items[i]

// Check if match:
// → if (currentItem.id === id)

// If found:
// → tree.items.splice(i, 1)
// → Remove from array (mutation)
// → return tree

// If not found:
// → deleteNode(currentItem, id)
// → Recurse into child
// → Search deeper in tree

// After loop:
// → return tree
// → Return potentially modified tree

// ============================================
// RECURSION VISUALIZATION
// ============================================

// Tree structure after several comments:
// {
//   id: 1,
//   items: [
//     {
//       id: 100,
//       name: 'First',
//       items: [
//         { id: 101, name: 'Reply 1', items: [] },
//         { id: 102, name: 'Reply 2', items: [
//           { id: 103, name: 'Nested reply', items: [] }
//         ]}
//       ]
//     },
//     { id: 104, name: 'Second', items: [] }
//   ]
// }

// Component tree rendering (recursive):
// <Comment comment={id:1}>              // Root
//   <Comment comment={id:100}>          // "First"
//     <Comment comment={id:101} />      // "Reply 1"
//     <Comment comment={id:102}>        // "Reply 2"
//       <Comment comment={id:103} />    // "Nested reply"
//     </Comment>
//   </Comment>
//   <Comment comment={id:104} />        // "Second"
// </Comment>

// Each Comment component:
// → Renders its own text and actions
// → Maps over comment.items
// → Recursively renders Comment for each child
// → Creates nested indented structure

// ============================================
// KEY CONCEPTS
// ============================================

// Why tree structure? → Unlimited nesting depth for replies
// Why recursive component? → Component renders itself for children
// Why single state in root? → Entire tree in one place, easier updates
// Why useNode hook? → Separate data manipulation logic from UI
// Why Date.now() for id? → Simple unique identifier using timestamp
// Why contentEditable? → Inline editing without input element
// Why innerText? → Access edited text from editable span
// Why splice? → Mutate array to remove element (then trigger re-render)
// Why spread in return? → Create new object reference for React
// Why map in recursive functions? → Process each child, return updated versions
// Why inputRef? → Access DOM element for focus and text content
// Why optional chaining? → Safe access to potentially undefined values
// Recursion base case → When condition met, stop recursing (found target)
// Recursion recursive case → Keep searching children until base case
// tree.items.push() → Mutation adds to array
// { ...tree, items: latestNode } → Immutable update pattern
// contentEditable="true" → Makes HTML element editable like input