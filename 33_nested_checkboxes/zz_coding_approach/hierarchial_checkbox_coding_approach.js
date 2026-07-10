/*
 * getLeafIds - Returns array of ALL leaf node IDs under a given node
 * 
 * EXAMPLE DATA STRUCTURE:
 * {
 *   id: 2,
 *   name: 'Mobile phones',
 *   children: [
 *     { id: 3, name: 'iPhone' },      // leaf (no children)
 *     { id: 4, name: 'Android' },     // leaf (no children)
 *   ]
 * }
 * 
 * CASE 1: Node is a LEAF (no children)
 * ─────────────────────────────────────
 * Input:  { id: 3, name: 'iPhone' }
 * Output: [3]
 * 
 * Input:  { id: 11, name: 'Toys' }
 * Output: [11]
 * 
 * 
 * CASE 2: Node has CHILDREN (use flatMap)
 * ─────────────────────────────────────
 * Input:  { id: 2, name: 'Mobile phones', children: [...] }
 * 
 * Step-by-step:
 *   node.children = [{ id: 3, name: 'iPhone' }, { id: 4, name: 'Android' }]
 *   
 *   node.children.map(getLeafIds) would give:
 *     → [ [3], [4] ]  // nested arrays!
 *   
 *   node.children.flatMap(getLeafIds) gives:
 *     → [3, 4]        // flattened! ✅
 * 
 * Output: [3, 4]
 * 
 * 
 * CASE 3: DEEPLY NESTED (recursive)
 * ─────────────────────────────────────
 * Input:  { id: 1, name: 'Electronics', children: [
 *            { id: 2, name: 'Mobile phones', children: [
 *              { id: 3, name: 'iPhone' },
 *              { id: 4, name: 'Android' }
 *            ]},
 *            { id: 5, name: 'Laptops', children: [
 *              { id: 6, name: 'MacBook' },
 *              { id: 7, name: 'Surface Pro' }
 *            ]}
 *          ]}
 * 
 * Execution trace:
 *   getLeafIds(Electronics)
 *     → children.flatMap(getLeafIds)
 *     → [getLeafIds(Mobile phones), getLeafIds(Laptops)].flat()
 *     → [[3, 4], [6, 7]].flat()
 *     → [3, 4, 6, 7]
 * 
 * Output: [3, 4, 6, 7]
 * 
 * 
 * WHY flatMap?
 * ────────────
 * map()     → Returns nested arrays: [[3, 4], [6, 7]]
 * flatMap() → Flattens one level:    [3, 4, 6, 7]
 * 
 * flatMap = map + flat(1) in single pass
 * 

// ## Visual Summary
// ```
// Electronics (id: 1)          ← getLeafIds returns [3, 4, 6, 7]
// ├── Mobile phones (id: 2)    ← getLeafIds returns [3, 4]
// │   ├── iPhone (id: 3)       ← getLeafIds returns [3] ✅ LEAF
// │   └── Android (id: 4)      ← getLeafIds returns [4] ✅ LEAF
// └── Laptops (id: 5)          ← getLeafIds returns [6, 7]
//     ├── MacBook (id: 6)      ← getLeafIds returns [6] ✅ LEAF
//     └── Surface Pro (id: 7)  ← getLeafIds returns [7] ✅ LEAF

 */




/////////////////////////

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * STATE: Set of checked leaf IDs
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * const [checked, setChecked] = useState(new Set());
 * 
 * WHY Set?
 * - O(1) add, delete, has operations
 * - No duplicates automatically
 * 
 * EXAMPLE STATE OVER TIME:
 * ────────────────────────
 * Initial:              Set {}
 * Click iPhone:         Set {3}
 * Click Android:        Set {3, 4}
 * Click Mobile phones:  Set {3, 4}      (already has all leaves)
 * Unclick iPhone:       Set {4}
 * Click Electronics:    Set {3, 4, 6, 7} (all leaves under Electronics)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * handleCheck - Add/Remove leaf IDs when checkbox clicked
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * const handleCheck = (node, isChecked) => {
 *   const leafIds = getLeafIds(node);
 *   setChecked((prev) => {
 *     const next = new Set(prev);
 *     leafIds.forEach((id) => (isChecked ? next.add(id) : next.delete(id)));
 *     return next;
 *   });
 * };
 * 
 * 
 * SCENARIO 1: Click on LEAF node (iPhone)
 * ───────────────────────────────────────
 * Input:  node = { id: 3, name: 'iPhone' }, isChecked = true
 * 
 * Step 1: leafIds = getLeafIds(node) → [3]
 * Step 2: prev = Set {}
 * Step 3: next = new Set(prev) → Set {}
 * Step 4: forEach → next.add(3) → Set {3}
 * Step 5: return Set {3}
 * 
 * Result: checked = Set {3}
 * 
 * 
 * SCENARIO 2: Click on PARENT node (Mobile phones)
 * ────────────────────────────────────────────────
 * Input:  node = { id: 2, name: 'Mobile phones', children: [...] }, isChecked = true
 * 
 * Step 1: leafIds = getLeafIds(node) → [3, 4]
 * Step 2: prev = Set {}
 * Step 3: next = new Set(prev) → Set {}
 * Step 4: forEach → next.add(3), next.add(4) → Set {3, 4}
 * Step 5: return Set {3, 4}
 * 
 * Result: checked = Set {3, 4}
 *         → Both iPhone AND Android get checked! ✅
 * 
 * 
 * SCENARIO 3: UNCHECK parent (Mobile phones)
 * ──────────────────────────────────────────
 * Input:  node = { id: 2, ... }, isChecked = false
 * 
 * Step 1: leafIds = [3, 4]
 * Step 2: prev = Set {3, 4}
 * Step 3: next = new Set(prev) → Set {3, 4}
 * Step 4: forEach → next.delete(3), next.delete(4) → Set {}
 * Step 5: return Set {}
 * 
 * Result: checked = Set {}
 *         → Both children unchecked! ✅
 * 
 * 
 * WHY new Set(prev)?
 * ──────────────────
 * - React needs NEW reference to trigger re-render
 * - Mutating prev directly won't work: prev.add(3) returns same Set
 * - new Set(prev) creates a shallow copy
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * renderNode - Recursive component with DERIVED state
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * const renderNode = (node, level = 0) => {
 *   const leafIds = getLeafIds(node);
 *   const checkedCount = leafIds.filter((id) => checked.has(id)).length;
 *   const isChecked = checkedCount === leafIds.length;
 *   const isIndeterminate = checkedCount > 0 && !isChecked;
 *   ...
 * };
 * 
 * 
 * EXAMPLE: Render "Mobile phones" when checked = Set {3}
 * ──────────────────────────────────────────────────────
 * node = { id: 2, name: 'Mobile phones', children: [iPhone, Android] }
 * 
 * Step 1: leafIds = [3, 4]
 * 
 * Step 2: checkedCount = [3, 4].filter(id => checked.has(id)).length
 *         → [3, 4].filter(id => Set{3}.has(id))
 *         → [3].length
 *         → 1
 * 
 * Step 3: isChecked = (1 === 2) → false
 *         (not all leaves are checked)
 * 
 * Step 4: isIndeterminate = (1 > 0 && !false) → true
 *         (some checked, but not all)
 * 
 * Result: Mobile phones shows INDETERMINATE state (━) ✅
 * 
 * 
 * TRUTH TABLE FOR CHECKBOX STATES:
 * ────────────────────────────────
 * | checkedCount | leafIds.length | isChecked | isIndeterminate | Visual |
 * |--------------|----------------|-----------|-----------------|--------|
 * | 0            | 2              | false     | false           | ☐      |
 * | 1            | 2              | false     | true            | ▣ (-)  |
 * | 2            | 2              | true      | false           | ☑      |
 * 
 * 
 * EXAMPLE: Full tree with checked = Set {3}
 * ─────────────────────────────────────────
 * 
 * Electronics (leafIds: [3,4,6,7], checkedCount: 1)
 *   → isChecked: false, isIndeterminate: true     → ▣
 *   │
 *   ├── Mobile phones (leafIds: [3,4], checkedCount: 1)
 *   │     → isChecked: false, isIndeterminate: true → ▣
 *   │     │
 *   │     ├── iPhone (leafIds: [3], checkedCount: 1)
 *   │     │     → isChecked: true, isIndeterminate: false → ☑
 *   │     │
 *   │     └── Android (leafIds: [4], checkedCount: 0)
 *   │           → isChecked: false, isIndeterminate: false → ☐
 *   │
 *   └── Laptops (leafIds: [6,7], checkedCount: 0)
 *         → isChecked: false, isIndeterminate: false → ☐
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * JSX BREAKDOWN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * <div style={{ marginLeft: level * 20 }}>
 * 
 * PURPOSE: Creates visual tree indentation
 * 
 * | level | marginLeft | Visual                |
 * |-------|------------|-----------------------|
 * | 0     | 0px        | Electronics           |
 * | 1     | 20px       |   Mobile phones       |
 * | 2     | 40px       |     iPhone            |
 * 
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * ref={(el) => el && (el.indeterminate = isIndeterminate)}
 * 
 * PURPOSE: Set native indeterminate property
 * 
 * WHY ref?
 * - 'indeterminate' is a DOM PROPERTY, not an HTML attribute
 * - Can't do: <input indeterminate={true} />  ❌ Won't work!
 * - Must set via JavaScript: element.indeterminate = true ✅
 * 
 * WHY el &&?
 * - ref callback runs with null on unmount
 * - Guard prevents: null.indeterminate = true (error)
 * 
 * 
 * ───────────────────────────────────────────────────────────────────────────
 * 
 * {node.children?.map((child) => renderNode(child, level + 1))}
 * 
 * PURPOSE: Recursively render children with increased level
 * 
 * EXAMPLE: renderNode(Electronics, 0)
 *   → renders Electronics at level 0
 *   → calls renderNode(MobilePhones, 1)
 *       → renders MobilePhones at level 1
 *       → calls renderNode(iPhone, 2)
 *           → renders iPhone at level 2
 *           → no children, stops
 *       → calls renderNode(Android, 2)
 *           → renders Android at level 2
 *           → no children, stops
 *   → calls renderNode(Laptops, 1)
 *       → ... and so on
 * 
 * WHY ?.map (optional chaining)?
 * - Leaf nodes have no children property
 * - Without ?.: undefined.map() throws error
 * - With ?.: undefined?.map() returns undefined (safe)
 * 
 */