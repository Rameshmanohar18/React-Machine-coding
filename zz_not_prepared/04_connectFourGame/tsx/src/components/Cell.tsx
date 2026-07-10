import React from 'react';
import '../components/Cell.css';

interface CellProps {
  value: string;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return <div className={`cell ${value}`}></div>;
};

export default Cell;
