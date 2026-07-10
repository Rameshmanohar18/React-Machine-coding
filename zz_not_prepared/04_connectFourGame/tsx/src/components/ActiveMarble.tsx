import React from 'react';
import { useEffect, useState } from 'react';

interface ActiveMarbleProps {
  turn: number;
  dropped: { x: number; y: number; player: number }[];
  setDropped: React.Dispatch<
    React.SetStateAction<{ x: number; y: number; player: number }[]>
  >;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveMarble: React.FC<ActiveMarbleProps> = ({
  turn,
  dropped,
  setDropped,
  setTurn,
}) => {
  const [column, setColumn] = useState<number | undefined>();
  const [row, setRow] = useState<number | undefined>();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 37 && column !== undefined && column > 0) {
      setColumn(column - 1);
    } else if (e.keyCode === 39) {
      if (column === undefined) setColumn(1);
      else if (column < 6) setColumn(column + 1);
    } else if (e.keyCode === 32 || e.keyCode === 13) {
      if (dropped.find((drop) => drop.x === 0 && drop.y === (column || 0))) {
        return;
      } else {
        const len =
          5 - dropped.filter((drop) => drop.y === (column || 0)).length;
        setRow(len);
        setTimeout(() => {
          setDropped([
            ...dropped,
            { x: len || 0, y: column || 0, player: turn },
          ]);
          setTurn(turn === 1 ? 2 : 1);
        }, 500);
      }
    }
  };

  useEffect(() => {
    setColumn(undefined);
    setRow(undefined);
  }, [turn]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown, false);
    return () => document.removeEventListener('keyup', handleKeyDown);
  });

  return (
    <div
      className={`active p${turn} column-${column ?? '-'} row-${
        row === undefined ? '-' : row
      }`}
    />
  );
};

export default ActiveMarble;
