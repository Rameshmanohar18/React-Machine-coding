import React from 'react';

const Cell = React.memo(({ value, onClick }) => {
  return (
    <button
      className={`cell ${value !== null ? 'filled' : 'empty'}`}
      onClick={onClick}
      aria-label={value !== null ? `Cell with value ${value}` : 'Empty cell'}
    >
      {value !== null ? value : ''}
    </button>
  );
});

Cell.displayName = 'Cell';

export default Cell