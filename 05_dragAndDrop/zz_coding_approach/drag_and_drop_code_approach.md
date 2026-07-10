# Puzzle Game Component Guide (React + Drag & Drop)

---

## App.jsx

* Import and render the `PuzzleGame.jsx` component.

```jsx
<PuzzleGame />
```

---

## PuzzleGame.jsx Breakdown

### Step 1: Generate Initial Pieces

```js
const initialPieces = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/200/200?random=${index + 1}`,
}));
```

### Step 2: Declare State Variables

```js
const [pieces, setPieces] = useState(initialPieces);
const [draggedPieceId, setDraggedPieceId] = useState(null);
```

### Step 3: Render Puzzle Pieces

```jsx
{pieces.map((piece) => (
  <PuzzlePiece
    key={piece.id}
    id={piece.id}
    url={piece.url}
    onDragStart={handleDragStart}
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
  />
))}
```

### Step 4: Define Core Logic Functions in Parent

#### handleDragStart

```js
const handleDragStart = (id) => {
  setDraggedPieceId(id);
};
```

#### handleDrop

```js
const handleDrop = (id) => {
  setPieces((prevPieces) => {
    const newPieces = [...prevPieces];

    const draggedIndex = newPieces.findIndex((piece) => piece.id === draggedPieceId);
    const droppedIndex = newPieces.findIndex((piece) => piece.id === id);

    [newPieces[draggedIndex], newPieces[droppedIndex]] = [
      newPieces[droppedIndex],
      newPieces[draggedIndex],
    ];

    return newPieces;
  });

  setDraggedPieceId(null);
};
```

---

## PuzzlePiece.jsx (Child Component)

### Structure:

```jsx
<div
  draggable
  onDragStart={() => onDragStart(id)}
  onDrop={() => onDrop(id)}
  onDragOver={onDragOver}
>
  <img src={url} alt={`Puzzle piece ${id}`} />
</div>
```

* Receives props: `id`, `url`, `onDragStart`, `onDrop`, `onDragOver`
* Fully encapsulates drag-and-drop behaviors

---

## Summary

| File              | Responsibility                                  |
| ----------------- | ----------------------------------------------- |
| `App.jsx`         | Mounts the game                                 |
| `PuzzleGame.jsx`  | Main game logic, DnD handlers, state management |
| `PuzzlePiece.jsx` | Single tile component with drag/drop handlers   |

* Reorders pieces on drag and drop
* Dynamic rendering of puzzle tiles from an image URL
* State-driven swapping logic via index comparison
