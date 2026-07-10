import { useState } from 'react';

function DataTable({
  initialData,
  columns,
  searchPlaceholder = 'Search...',
  defaultRowsPerPage = 5,
}) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Helper function to check if the term matches any searchable attributes
  const matchesSearchTerm = (item, term) => {
    const searchableFields = columns
      .filter((column) => column.searchable)
      .map((column) => column.key);

    const lowerCaseTerm = term.toLowerCase();

    return searchableFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(lowerCaseTerm)
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when search changes

    if (!term) {
      setData(initialData);
      return;
    }

    const filteredData = initialData.filter((item) =>
      matchesSearchTerm(item, term)
    );
    setData(filteredData);
  };

  const handleSort = (key) => {
    // Check if this column is sortable
    const column = columns.find((col) => col.key === key);
    if (!column || !column.sortable) return;

    let direction = 'ascending';

    // Toggle direction if clicking the same column
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      // Handle different data types
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      // Handle numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'ascending' ? aVal - bVal : bVal - aVal;
      }

      // Handle strings and other types
      if (aVal < bVal) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aVal > bVal) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = data.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((current) => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((current) => Math.min(totalPages, current + 1));
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className='table-container'>
      {/* Search Input */}
      <input
        className='search-input'
        type='text'
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Data Table */}
      <table className='table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
                className={column.sortable ? 'sortable' : ''}
                style={{
                  cursor: column.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
              >
                {column.label}
                {sortConfig?.key === column.key && (
                  <span className='sort-indicator'>
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedData.length > 0 ? (
            selectedData.map((item, index) => (
              <tr key={item.id || `${startIndex + index}`}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className='no-data'>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='pagination-controls'>
        <button
          className='pagination-btn'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className='pagination-info'>
          Page {currentPage} of {totalPages || 1}
          {data.length > 0 && (
            <span className='record-count'>
              ({data.length} record{data.length !== 1 ? 's' : ''})
            </span>
          )}
        </span>

        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className='rows-per-page-select'
        >
          {[5, 10, 15, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} per page
            </option>
          ))}
        </select>

        <button
          className='pagination-btn'
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
