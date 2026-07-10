import { useState } from 'react';

export default function TableGenerator() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = () => {
    if (rows && columns) {
      setShowTable(true);
    }
  };

  const resetTable = () => {
    setRows('');
    setColumns('');
    setShowTable(false);
  };

  const generateTable = () => {
    const tableRows = [];
    let counter = 1;

    for (let i = 0; i < parseInt(rows); i++) {
      const tableCells = [];
      for (let j = 0; j < parseInt(columns); j++) {
        tableCells.push(<td key={j}>{counter}</td>);
        counter++;
      }
      tableRows.push(<tr key={i}>{tableCells}</tr>);
    }
    return tableRows;
  };

  return (
    <div className='container'>
      <h1>Table Generator</h1>

      <div className='form-container'>
        <div className='input-group'>
          <label>Rows:</label>
          <input
            type='number'
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            min='1'
          />
        </div>

        <div className='input-group'>
          <label>Columns:</label>
          <input
            type='number'
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            min='1'
          />
        </div>

        <button onClick={handleSubmit}>Generate Table</button>
      </div>

      {showTable && (
        <div className='table-container'>
          <h2>
            Generated Table ({rows} x {columns})
          </h2>
          <table>
            <tbody>{generateTable()}</tbody>
          </table>
        </div>
      )}

      <div className='resetBtn'>
        <button onClick={resetTable}>Reset</button>
      </div>
    </div>
  );
}
