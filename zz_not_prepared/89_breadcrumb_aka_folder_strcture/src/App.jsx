import { useState } from 'react';
import { TREE } from './data/treeData';

// getPath finds the full path array (root → selected node) from the tree
import { getPath } from './utils/getPath';
import TreeNode from './components/TreeNode';
import Breadcrumb from './components/Breadcrumb';
import DetailPanel from './components/DetailPanel';

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  // If something is selected, find the full path from root → that node.
  // ?? [] means: if getPath returns null (id not found), fallback to empty array.
  // If nothing selected, skip the search and just use [].
  const path = selectedId ? getPath(TREE, selectedId) ?? [] : [];

  // The selected node is always the LAST item in the path array.
  // ?? null means: if path is empty (nothing selected), selectedNode is null.
  const selectedNode = path[path.length - 1] ?? null;

  // path[0] is always the root node ("root"), which we don't want to show in breadcrumb.
  // slice(1) removes the first element, keeping only the meaningful ancestors + selected.
  const breadcrumbPath = path.slice(1);

  return (
    <div className='app'>
      {/* Breadcrumb sits at the top, always visible.
          onNavigate is just setSelectedId — clicking a crumb selects that node. */}
      <Breadcrumb path={breadcrumbPath} onNavigate={setSelectedId} />

      <div className='body'>
        {/* Left panel: the file tree.
            TREE.children holds the top-level nodes (src, public, package.json).
            We skip TREE itself (root) because we don't want to render a "root" row. */}
        <div className='tree'>
          {Object.values(TREE.children).map((node) => (
            // key=node.id prevents React from re-rendering unchanged nodes.
            // selectedId is passed down so TreeNode can highlight itself if selected.
            // onSelect is setSelectedId — clicking a node just updates state here.
            <TreeNode
              key={node.id}
              node={node}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        {/* Right panel: details about whatever is selected.
            If nothing is selected, DetailPanel shows a placeholder message. */}
        <div className='detail'>
          <DetailPanel node={selectedNode} path={breadcrumbPath} />
        </div>
      </div>
    </div>
  );
}
