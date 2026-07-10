import { useState } from 'react';

// node       = this node's data object { id, name, children }
// selectedId = the currently selected node's id (comes from App state)
// onSelect   = callback to tell App which node was clicked
export default function TreeNode({ node, selectedId, onSelect }) {
  // Each folder manages its own open/close independently.
  // Starts closed (false). Files also get this state but never use it — harmless.
  const [open, setOpen] = useState(false);

  // If node.children is an object (not null), it's a folder.
  // Boolean(null) = false, Boolean({...}) = true.
  const isFolder = Boolean(node.children);

  // This node should appear highlighted if its id matches the selected one.
  const isSelected = node.id === selectedId;

  function handleClick() {
    // Always tell App this node was clicked so it can update selectedId.
    onSelect(node.id);

    // Only toggle open/close for folders. Clicking a file does nothing visually.
    if (isFolder) setOpen((prev) => !prev);
  }

  return (
    <div>
      {/* Clickable row for this node */}
      <div
        // Conditionally add "selected" class to highlight the active node.
        // Template literal lets us combine a base class with a conditional one.
        className={`tree-row ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
      >
        {/* Show different emoji based on type and open state:
            open folder = 📂, closed folder = 📁, file = 📄 */}
        {isFolder ? (open ? '📂' : '📁') : '📄'} {node.name}
      </div>

      {/* Only render children if:
          1. This node IS a folder (isFolder) — files have no children
          2. The folder is currently OPEN (open)
          Both must be true, so we use && */}
      {isFolder && open && (
        // Indented wrapper div gives visual nesting in the tree
        <div className='tree-children'>
          {Object.values(node.children).map((child) => (
            // Recursion: each child renders itself as a TreeNode.
            // This handles any depth of nesting automatically.
            // key=child.id prevents unnecessary re-renders.
            // We pass selectedId and onSelect all the way down so any
            // deeply nested node can still highlight and notify App.
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
