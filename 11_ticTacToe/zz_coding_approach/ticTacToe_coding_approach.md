# Tic Tac Toe Game

---

## Step 1: useState Declarations

```js
const [squares, setSquares] = useState(Array(9).fill(null));
const [isXNext, setIsXNext] = useState(true);
```

---

## Step 2: Return JSX Structure

```jsx
<div className='app_container'>
  <div>{status}</div>

  {[0, 1, 2].map((row) => (
    <div key={row} className='row'>
      {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
    </div>
  ))}

  <button onClick={resetGame}>Reset Game</button>
</div>
```

---

## Step 3: Render Square

```js
const renderSquare = (i) => {
  return (
    <button className='square' onClick={() => handleClick(i)}>
      {squares[i]}
    </button>
  );
};
```

---

## Step 4: Handle Click

```js
const handleClick = (i) => {
  if (calculateWinner(squares) || squares[i]) return;

  const newSquares = [...squares];
  newSquares[i] = isXNext ? 'X' : 'O';

  setSquares(newSquares);
  setIsXNext(!isXNext);
};
```

---

## Step 5: Reset Game Logic

```js
const resetGame = () => {
  setIsXNext(true);
  setSquares(Array(9).fill(null));
};
```

---

## Step 6: Calculate Winner Function

```js
const calculateWinner = (squares) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
```

---

## Step 7: Game Status Display

```js
const winner = calculateWinner(squares);
let status;

if (winner) {
  status = `Winner is: ${winner} 🎁🎉💥`;
} else {
  status = `Next Player: ${isXNext ? 'X' : 'O'}`;
}
```

---

## Summary

| Part              | Responsibility                  |
| ----------------- | ------------------------------- |
| `squares`         | Current state of 9 cells        |
| `isXNext`         | Toggle between X and O turns    |
| `renderSquare`    | Returns JSX for each square     |
| `handleClick`     | Sets new value on user click    |
| `calculateWinner` | Checks for winning combinations |
| `resetGame`       | Resets board state to initial   |

- All logic is handled in `App.jsx`
