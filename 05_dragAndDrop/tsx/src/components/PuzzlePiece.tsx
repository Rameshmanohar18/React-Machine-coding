import React from 'react';

type PuzzlePieceProps = {
  id: number;
  url: string;
  isDragging?: boolean;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  id,
  url,
  isDragging,
  onDragStart,
  onDrop,
  onDragOver,
}) => (
  <div
    className={`piece ${isDragging ? 'dragging' : ''}`}
    draggable='true'
    onDragStart={() => onDragStart(id)}
    onDrop={() => onDrop(id)}
    onDragOver={onDragOver}
  >
    <img src={url} alt={`Piece ${id}`} />
  </div>
);
