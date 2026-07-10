## Step 1: Setup in `App.jsx`

This is the root of the app.

### What we do:

- Create an initial `comments` object:

  - Starts with `id: 1` and empty `items` array (no replies yet).

- Declare **useState**:

  - `commentsData` to manage the entire comment tree.

- Render `Comment` component with props:
  - `handleInsertNode`, `handleEditNode`, `handleDeleteNode`
  - `commentsData`

### Core Functions:

- **Insert Node**:

  - Accepts `commentId` and `inputItem`.
  - Calls `insertNode(commentsData, commentId, inputItem)`.
  - Updates state using `setCommentsData`.

- **Edit Node**:

  - Accepts `commentId` and `value`.
  - Calls `editNode(commentsData, commentId, value)`.
  - Updates state using `setCommentsData`.

- **Delete Node**:
  - Accepts `commentId`.
  - Calls `deleteNode(commentsData, commentId)`.
  - Updates state using `setCommentsData`.

### Code:

```jsx
import { useState } from 'react';
import Comment from './Comment';
import useNode from './useNode';

const comments = { id: 1, items: [] };

function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (commentId, item) => {
    const updatedTree = insertNode(commentsData, commentId, item);
    setCommentsData(updatedTree);
  };

  const handleEditNode = (commentId, value) => {
    const updatedTree = editNode(commentsData, commentId, value);
    setCommentsData(updatedTree);
  };

  const handleDeleteNode = (commentId) => {
    const updatedTree = deleteNode(commentsData, commentId);
    setCommentsData(updatedTree);
  };

  return (
    <Comment
      handleInsertNode={handleInsertNode}
      handleEditNode={handleEditNode}
      handleDeleteNode={handleDeleteNode}
      comment={commentsData}
    />
  );
}

export default App;
```

---

## Step 2: Create `Comment.jsx` Component

This component manages individual comments and their replies.

### What we do:

- Declare **useState**:

  - `input` - input value for new comment.
  - `editMode` - boolean to enable/disable editing.
  - `showInput` - boolean to show/hide reply input.
  - `expand` - boolean to expand/collapse replies.

- Use **useRef** for `inputRef` to auto-focus the input.

### JSX Structure:

- **First Div**:

  - If it's the root comment (`id === 1`):
    - Show input box to add the first comment.
  - Else:
    - Show the comment text (`span`) (editable if `editMode` is `true`).
    - Show actions:
      - **If editing**: Save and Cancel buttons.
      - **If not editing**: Reply, Edit, and Delete buttons.

- **Second Div**:
  - If expanded:
    - Show reply input if `showInput` is true.
    - Map and render `comment.items` recursively using `Comment` component.

### Code:

```jsx
import { useState, useRef } from 'react';
import Action from './Action';

function Comment({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) {
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, input);
      setEditMode(false);
    } else {
      handleInsertNode(comment.id, input);
      setExpand(true);
      setShowInput(false);
    }
    setInput('');
  };

  const onDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div className='comment'>
      <div>
        {comment.id === 1 ? (
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              ref={inputRef}
            >
              {comment.name}
            </span>
            {editMode ? (
              <>
                <Action type='SAVE' handleClick={onAddComment} />
                <Action
                  type='CANCEL'
                  handleClick={() => {
                    if (inputRef.current)
                      inputRef.current.innerText = comment.name;
                    setEditMode(false);
                  }}
                />
              </>
            ) : (
              <>
                <Action
                  type='REPLY'
                  handleClick={() => {
                    setShowInput(true);
                    setExpand(true);
                  }}
                />
                <Action
                  type='EDIT'
                  handleClick={() => {
                    setEditMode(true);
                    setInput(comment.name);
                  }}
                />
                <Action type='DELETE' handleClick={onDelete} />
              </>
            )}
          </>
        )}
      </div>

      {expand && (
        <div style={{ marginLeft: 25 }}>
          {showInput && (
            <div>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Action type='REPLY' handleClick={onAddComment} />
              <Action
                type='CANCEL'
                handleClick={() => {
                  setShowInput(false);
                  if (comment.items.length === 0) setExpand(false);
                }}
              />
            </div>
          )}
          {comment.items.map((child) => (
            <Comment
              key={child.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
```

---

## Step 3: Create `Action.jsx` Component

A basic button component for actions like Reply, Edit, Save, Delete.

### Code:

```jsx
function Action({ type, handleClick }) {
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', margin: '5px 0' }}>
      {type}
    </div>
  );
}

export default Action;
```

---

## Step 4: Create `useNode.jsx` Utility

Functions to insert, edit, and delete nodes recursively.

### Insert Node:

```jsx
const insertNode = (tree, commentId, item) => {
  if (tree.id === commentId) {
    tree.items.push({
      id: new Date().getTime(),
      name: item,
      items: [],
    });
    return tree;
  }

  tree.items = tree.items.map((child) => insertNode(child, commentId, item));
  return { ...tree };
};
```

### Edit Node:

```jsx
const editNode = (tree, commentId, value) => {
  if (tree.id === commentId) {
    tree.name = value;
    return tree;
  }

  tree.items.map((child) => editNode(child, commentId, value));
  return { ...tree };
};
```

### Delete Node:

```jsx
const deleteNode = (tree, id) => {
  tree.items = tree.items
    .filter((child) => child.id !== id)
    .map((child) => deleteNode(child, id));
  return tree;
};
```

### Export All:

```jsx
const useNode = () => {
  return { insertNode, editNode, deleteNode };
};

export default useNode;
```

---
