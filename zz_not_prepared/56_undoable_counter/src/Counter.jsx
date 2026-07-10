import { useState } from 'react';

function performOperation(counter, operation) {
  switch (operation) {
    case '/2':
      return counter / 2;
    case '-1':
      return counter - 1;
    case '+1':
      return counter + 1;
    case 'x2':
      return counter * 2;
    default:
      return counter;
  }
}

export default function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);

  const handleOperation = (operation) => {
    const oldCount = count;
    const newCount = performOperation(count, operation);

    setCount(newCount);
    setHistory([{ operation, before: oldCount, after: newCount }, ...history]);
    setUndoHistory([]); // Clear undo history when new operation is performed
  };

  const undo = () => {
    if (history.length > 0) {
      const [latest, ...restHistory] = history;
      setCount(latest.before);
      setHistory(restHistory);
      setUndoHistory([latest, ...undoHistory]);
    }
  };

  const redo = () => {
    if (undoHistory.length > 0) {
      const [latest, ...restUndoHistory] = undoHistory;
      setCount(latest.after);
      setUndoHistory(restUndoHistory);
      setHistory([latest, ...history]);
    }
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
    setUndoHistory([]);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>

      <div>
        <button onClick={() => handleOperation('/2')}>/2</button>
        <button onClick={() => handleOperation('-1')}>-1</button>
        <button onClick={() => handleOperation('+1')}>+1</button>
        <button onClick={() => handleOperation('x2')}>x2</button>
      </div>

      <div>
        <button onClick={undo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={undoHistory.length === 0}>
          Redo
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.operation}</td>
              <td>{entry.before}</td>
              <td>{entry.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
