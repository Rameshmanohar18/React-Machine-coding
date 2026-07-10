import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [board, setBoard] = useState<string[][]>(
    Array(7).fill(Array(6).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'Red' | 'Yellow'>('Red');
  const [winner, setWinner] = useState<string | null>(null);

  const dropPiece = (columnIndex: number) => {
    if (winner) return;
    const newBoard = board.map((row) => [...row]);
    for (let i = newBoard[columnIndex].length - 1; i >= 0; i--) {
      if (!newBoard[columnIndex][i]) {
        newBoard[columnIndex][i] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard, columnIndex, i);
        setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        break;
      }
    }
  };

  const checkWinner = (board: string[][], col: number, row: number) => {
    // Add logic to check the winner
  };

  const resetGame = () => {
    setBoard(Array(7).fill(Array(6).fill(null)));
    setCurrentPlayer('Red');
    setWinner(null);
  };

  return (
    <div className='game'>
      <Board board={board} dropPiece={dropPiece} />
      {winner && <div className='winner'>Winner: {winner}</div>}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Game;
