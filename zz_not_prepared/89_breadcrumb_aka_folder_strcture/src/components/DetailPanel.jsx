// node = the currently selected tree node object (or null if nothing selected)
// path = array of ancestor nodes up to and including selected (root excluded)
export default function DetailPanel({ node, path }) {
  // Early return: if nothing is selected yet, show a placeholder.
  // This avoids adding lots of conditional checks below.
  if (!node) {
    return <div className='detail-empty'>Select a file or folder</div>;
  }

  // node.children is an object for folders, null for files.
  // Boolean(null) = false, Boolean({...}) = true.
  const isFolder = Boolean(node.children);

  // Build the display path string like "/src/components/Button.jsx"
  // path is an array of node objects, so we extract just the names,
  // join them with "/", then prepend a leading "/".
  const fullPath = '/' + path.map((n) => n.name).join('/');

  return (
    <div className='detail-panel'>
      {/* Show folder or file emoji based on type, followed by the node name */}
      <h3>
        {isFolder ? '📁' : '📄'} {node.name}
      </h3>

      {/* fullPath computed above e.g. "/src/components" */}
      <p>
        <b>Path:</b> {fullPath}
      </p>

      {/* Friendly label instead of showing true/false */}
      <p>
        <b>Type:</b> {isFolder ? 'Folder' : 'File'}
      </p>

      {/* path.length tells us how deep we are in the tree.
          Root's direct children = depth 1, their children = depth 2, etc. */}
      <p>
        <b>Depth:</b> {path.length}
      </p>

      {/* Only show children count for folders (files don't have children).
          Object.keys gives us the list of child keys, .length gives the count. */}
      {isFolder && (
        <p>
          <b>Children:</b> {Object.keys(node.children).length}
        </p>
      )}
    </div>
  );
}
