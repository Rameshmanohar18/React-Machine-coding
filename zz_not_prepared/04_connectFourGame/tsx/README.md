```js
npm i typescript
```

### File 1: `constants.ts`
- **No Changes Needed**

### File 2: `ActiveMarble.tsx`
- **Type Annotations**:
  - Added an `ActiveMarbleProps` interface to define the prop types.
  - Typed the `column` and `row` state variables as `number | undefined`.
  - Typed the `handleKeyDown` function to accept a `KeyboardEvent`.
- **Use of Optional Chaining**:
  - Used `column ?? '-'` to handle `undefined` values in the class names.

### File 3: `Board.tsx`
- **Type Annotations**:
  - Used `React.FC` to define the component as a functional component.
  - Added type annotations for the `tiles` array structure.
- **Map Function Key**:
  - Changed the `key` prop in the `map` function to use template literals for uniqueness.

### File 4: `Cell.tsx`
- **Type Annotations**:
  - Added a `CellProps` interface to type the `value` prop passed to the `Cell` component.
  - Used `React.FC<CellProps>` to define the component as a functional component with typed props.

### File 5: `DropZone.tsx`
- **Type Annotations**:
  - Added a `Drop` interface to describe the structure of objects in the `dropped` array.
  - Properly typed the state variables `turn`, `dropped`, and `winner`.
  - Typed the `reset` and `findWinner` functions for better clarity.

### File 6: `Game.tsx`
- **Type Annotations**:
  - Typed state variables with appropriate types: `string[][]` for the board, `'Red' | 'Yellow'` for the current player, and `string | null` for the winner.
  - Typed the `dropPiece` function's parameter as `number`.
  - Ensured the `checkWinner` function accepts correctly typed parameters.

### File 7: `Winner.tsx`
- **Type Annotations**:
  - Added a `WinnerProps` interface to type the `winner` and `reset` props passed to the `Winner` component.
  - Used `React.FC<WinnerProps>` to define the component as a functional component with typed props.

### File 8: `App.tsx`
- **No TypeScript Changes Needed**:

### File 9: `main.tsx`
- **Type Assertion**:
  - Added `as HTMLElement` to the `document.getElementById('root')` to ensure TypeScript recognizes the correct type of the `root` element.

---