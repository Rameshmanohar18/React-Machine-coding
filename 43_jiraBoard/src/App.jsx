import { useState } from 'react';


const COLUMNS = ['Todo', 'In Progress', 'Done'];

// Maps column name → CSS slug (for className usage)
const COL_SLUG = {
  Todo: 'todo',
  'In Progress': 'in-progress',
  Done: 'done',
};

const INITIAL_CARDS = [
  { id: '1', text: 'Design new dashboard layout', column: 'Todo' },
  { id: '2', text: 'Fix login page bug', column: 'In Progress' },
  { id: '3', text: 'Write API documentation', column: 'Done' },
  { id: '4', text: 'Set up CI/CD pipeline', column: 'Todo' },
];

export default function KanbanBoard() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const addCard = () => {
    if (!inputValue.trim()) return;
    setCards((prev) => [
      ...prev,
      { id: Date.now().toString(), text: inputValue.trim(), column: 'Todo' },
    ]);
    setInputValue('');
  };

  const deleteCard = (id) =>
    setCards((prev) => prev.filter((c) => c.id !== id));

  const handleDrop = (targetCol) => {
    if (!draggedId) return;
    setCards((prev) =>
      prev.map((c) => (c.id === draggedId ? { ...c, column: targetCol } : c))
    );
    setDraggedId(null);
    setDragOverCol(null);
  };

  return (
    <div className='app'>
      {/* Header */}
      <div className='header'>
        <h1>Kanban Board</h1>
        <p>Drag cards between columns to update status</p>
      </div>

      {/* Add Card */}
      <div className='add-section'>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCard()}
          placeholder='New task description...'
        />
        <button className='add-btn' onClick={addCard}>
          + Add Task
        </button>
      </div>

      {/* Board */}
      <div className='board'>
        {COLUMNS.map((col) => {
          const slug = COL_SLUG[col];
          const colCards = cards.filter((c) => c.column === col);

          return (
            <div
              key={col}
              className={`column ${dragOverCol === col ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverCol(col);
              }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={() => handleDrop(col)}
            >
              {/* Column Header */}
              <div className={`column-header ${slug}`}>
                <div className={`dot ${slug}`} />
                <span className={`col-title ${slug}`}>{col}</span>
                <span className={`badge ${slug}`}>{colCards.length}</span>
              </div>

              {/* Cards */}
              <div className='cards-container'>
                {colCards.length === 0 && (
                  <p className='empty-state'>Drop cards here</p>
                )}
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    className={`card ${
                      draggedId === card.id ? 'dragging' : ''
                    }`}
                    onDragStart={() => setDraggedId(card.id)}
                    onDragEnd={() => {
                      setDraggedId(null);
                      setDragOverCol(null);
                    }}
                  >
                    <span className='card-text'>{card.text}</span>
                    <button
                      className='delete-btn'
                      onClick={() => deleteCard(card.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
