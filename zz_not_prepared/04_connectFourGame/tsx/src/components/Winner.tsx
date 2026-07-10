import React from "react";

interface WinnerProps {
  winner: number;
  reset: () => void;
}

const Winner: React.FC<WinnerProps> = ({ winner, reset }) => (
  <p className='center'>
    <span>{winner === -1 ? 'No player won!' : `Player ${winner} won!`}</span>
    <br />
    <br />
    <button onClick={reset}>Play again?</button>
  </p>
);

export default Winner;
