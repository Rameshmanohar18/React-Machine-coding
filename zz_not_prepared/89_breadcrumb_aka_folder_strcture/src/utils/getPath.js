// Recursively searches the tree to find the path from the root to a target node.
//
// Arguments:
//   node     — the current node we're visiting (starts at TREE root)
//   targetId — the id we're searching for
//   path     — accumulates visited nodes as we go deeper (default = [])
//
// Returns:
//   Array of nodes [root, ...ancestors, targetNode] if found
//   null if targetId doesn't exist anywhere under this node
export function getPath(node, targetId, path = []) {
  // Add the current node to the path we've walked so far.
  // Spread [...path, node] creates a NEW array instead of mutating the original.
  // This is important because each recursive branch needs its own copy.
  const current = [...path, node];

  // Base case: we found the target node.
  // Return the full path array including this node.
  if (node.id === targetId) return current;

  // Base case: this is a file (no children). Dead end — target isn't here.
  if (!node.children) return null;

  // Recursive case: this is a folder, so search each child.
  for (const child of Object.values(node.children)) {
    // Recurse into the child, passing the path we've built so far.
    const result = getPath(child, targetId, current);

    // If the child (or any of its descendants) found the target,
    // bubble the result back up immediately — no need to check other children.
    if (result) return result;
  }

  // If we checked all children and found nothing, this branch is a dead end.
  return null;
}
