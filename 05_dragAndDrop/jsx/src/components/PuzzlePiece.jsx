export const PuzzlePiece = ({
  id,
  url,
  // isDragging,
  onDragStart,
  onDrop,
  onDragOver,
}) => (
  <div
    // className={`piece ${isDragging ? 'dragging' : ''}`}
    // draggable='true'
    onDragStart={() => onDragStart(id)}
    onDrop={() => onDrop(id)}
    onDragOver={onDragOver}
  >
    <img src={url} alt={`Piece ${id}`} />
  </div>
);
