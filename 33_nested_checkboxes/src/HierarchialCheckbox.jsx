/*
 * HIERARCHICAL CHECKBOX - Interview Approach
 *
 * KEY INSIGHT:
 * - Store ONLY leaf IDs in state
 * - Parent's checked/indeterminate state is DERIVED, never stored
 *
 * FUNCTIONS:
 * 1) getLeafIds(node) → Returns all leaf IDs under a node (recursive flatMap)
 * 2) handleCheck(node, isChecked) → Adds/removes leaf IDs from Set
 * 3) renderNode(node, level) → Renders checkbox + recursively renders children
 *
 * STATE LOGIC:
 * - isChecked = all leaves checked
 * - isIndeterminate = some leaves checked (but not all)
 * - Both calculated on render, not stored
 *
 * CHECKBOX INDETERMINATE:
 * - Native HTML property, must set via ref (can't use attribute)
 *
 * STYLING:
 * - marginLeft: level * 20 for tree indentation
 */
import React, { useState } from 'react';

// Nested tree data — nodes with children are "parents", nodes without are "leaves"
// Leaf nodes: iPhone, Android, MacBook, Surface Pro, Fiction, Non-fiction, Toys
// (these are the only ones that actually get stored in the checked Set)
const data = [
  {
    id: 1,
    name: 'Electronics',
    children: [
      {
        id: 2,
        name: 'Mobile phones',
        children: [
          { id: 3, name: 'iPhone' }, // leaf
          { id: 4, name: 'Android' }, // leaf
        ],
      },
      {
        id: 5,
        name: 'Laptops',
        children: [
          { id: 6, name: 'MacBook' }, // leaf
          { id: 7, name: 'Surface Pro' }, // leaf
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Books',
    children: [
      { id: 9, name: 'Fiction' }, // leaf
      { id: 10, name: 'Non-fiction' }, // leaf
    ],
  },
  { id: 11, name: 'Toys' }, // leaf (no children)
];

// Recursively collects IDs of all leaf nodes under a given node
// Why only leaf IDs? Because the checked Set only tracks leaves.
// Parent checkboxes are "derived" — computed from how many leaves are checked.
//
// Example: getLeafIds(Electronics node) → [3, 4, 6, 7]
// Example: getLeafIds(iPhone node)      → [3]   (base case — no children)
const getLeafIds = (node) => {
  // Base case: no children means this IS the leaf — return its own id
  if (!node.children) return [node.id];

  // Recursive case: ask each child for their leaf ids, then flatten into one array
  // .flatMap() bridges the gap — iterates array, passes each node individually ✅
  // Without flat: [[3,4], [6,7]] — nested arrays per child
  // With flatMap: [3, 4, 6, 7]  — single flat array
  return node.children.flatMap(getLeafIds);
};

export default function HierarchicalCheckbox() {
  // Only stores leaf node IDs — NOT parent IDs
  // Set is used instead of array for O(1) lookup with .has()
  // e.g. checked = Set { 3, 4 } means iPhone + Android are checked
  const [checked, setChecked] = useState(new Set());

  // Called when "any" checkbox changes
  // node     → the clicked node (could be parent or leaf)
  // isChecked → true if checking, false if unchecking
  const handleCheck = (node, isChecked) => {
    // Get all leaf IDs under this node
    // If you click "Electronics" → leafIds = [3, 4, 6, 7]
    // If you click "iPhone"      → leafIds = [3]
    const leafIds = getLeafIds(node);

    setChecked((prev) => {
      // Copy the existing Set so we don't mutate state directly
      // We can't just do prev.add() because that mutates the same Set reference
      // React won't detect the change unless it's a NEW Set object
      const next = new Set(prev);

      // Loop through all affected leaf IDs and either add or remove them based on whether the checkbox was checked or unchecked.

      // Checking "Electronics" (isChecked=true):
      // next.add(3) → next.add(4) → next.add(6) → next.add(7)

      // Unchecking "Electronics" (isChecked=false):
      // next.delete(3) → next.delete(4) → next.delete(6) → next.delete(7)
      leafIds.forEach((id) => (isChecked ? next.add(id) : next.delete(id)));

      return next; // return new Set → triggers re-render
    });
  };

  // Renders a single node AND recursively renders its children
  // level controls the left indentation (0 = root, 1 = child, 2 = grandchild...)
  const renderNode = (node, level = 0) => {
    // Get all leaf IDs under this node (same helper as above)
    const leafIds = getLeafIds(node);

    // Again get all leaf IDs under this node — but this time it's for reading (to calculate checked state), not for writing.
    // Count how many of those leaves are currently in the checked Set
    // e.g. leafIds=[3,4,6,7], checked=Set{3,4} → checkedCount = 2
    const checkedCount = leafIds.filter((id) => checked.has(id)).length;

    // Fully checked: every single leaf under this node is checked
    // e.g. checkedCount=4, leafIds.length=4 → isChecked = true
    // Count how many of this node's leaves are currently checked. This single number drives everything below.

    // Electronics leafIds = [3, 4, 6, 7]
    // checked Set = { 3, 4 }
    // checkedCount = 2  (iPhone + Android are checked)

    // Should this checkbox appear fully ticked? Only if ALL leaves under it are checked.
    const isChecked = checkedCount === leafIds.length;

    // Indeterminate: SOME (not zero, not all) leaves are checked
    // This is the "dash" state you see on parent checkboxes in file explorers
    // e.g. checkedCount=2 out of 4 → isIndeterminate = true
    const isIndeterminate = checkedCount > 0 && !isChecked;

    return (
      <div key={node.id} style={{ marginLeft: level * 20 }}>
        <label>
          <input
            type='checkbox'
            checked={isChecked}
            // `indeterminate` is a DOM property, NOT an HTML attribute
            // So you can't set it via JSX props like checked={} or indeterminate={}
            // The ONLY way to set it is via direct DOM manipulation using a ref
            // ref callback: `el` = the actual <input> DOM element
            // el && (el.indeterminate = ...) → guards against null (unmounted case)
            ref={(el) => el && (el.indeterminate = isIndeterminate)}
            onChange={(e) => handleCheck(node, e.target.checked)}
          />
          {node.name}
        </label>

        {/* Recursively render children, increasing indent level by 1 each time */}
        {/* Optional chaining ?. handles leaf nodes that have no children */}
        {node.children?.map((child) => renderNode(child, level + 1))}
      </div>
    );
  };

  // Kick off rendering from the top-level nodes (level=0 by default)
  return <div>{data.map((node) => renderNode(node))}</div>;
}
