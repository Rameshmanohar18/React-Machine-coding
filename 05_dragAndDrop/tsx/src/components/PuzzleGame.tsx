import React, { useState } from 'react';
import './PuzzleGame.css';
import { PuzzlePiece } from './PuzzlePiece';

type Piece = {
  id: number;
  url: string;
};

const initialPieces: Piece[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/200/200?random=${i + 1}`,
}));

const PuzzleGame: React.FC = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [draggedPieceId, setDraggedPieceId] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    setDraggedPieceId(id);
  };

  const handleDrop = (id: number) => {
    setPieces((prevPieces) => {
      const newPieces = [...prevPieces];
      const draggedIndex = newPieces.findIndex((p) => p.id === draggedPieceId);
      const droppedIndex = newPieces.findIndex((p) => p.id === id);
      [newPieces[draggedIndex], newPieces[droppedIndex]] = [
        newPieces[droppedIndex],
        newPieces[draggedIndex],
      ];
      return newPieces;
    });
    setDraggedPieceId(null);
  };

  return (
    <div className='container'>
      <div className='puzzle-container'>
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
      </div>
    </div>
  );
};

export default PuzzleGame;
