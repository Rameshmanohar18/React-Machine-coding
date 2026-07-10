import { useState, useEffect } from 'react';

export default function DataTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // NOT IMPLEMENTED

  const API_URL = 'https://dummyjson.com/products?limit=100';

  const fetchProducts = async () => {
    const data = await fetch(API_URL);
    const response = await data.json();
    setItems(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1) Filter
  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.title || '').toLowerCase().includes(query) ||
      (item.category || '').toLowerCase().includes(query) ||
      (item.brand || '').toLowerCase().includes(query)
    );
  });

  // 2) Sort - NOT IMPLEMENTED
  // const sortedItems = [...filteredItems].sort((a, b) => {
  //   if (!sortConfig.key) return 0;
  //   const aVal = (a[sortConfig.key] || '').toString().toLowerCase();
  //   const bVal = (b[sortConfig.key] || '').toString().toLowerCase();
  //   if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
  //   if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
  //   return 0;
  // });

  // 3) Paginate
  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);
  const indexOfLastItem = currentPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRecordsChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // NOT IMPLEMENTED
  // const handleSort = (key) => {
  //   setSortConfig((prev) => ({
  //     key,
  //     direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
  //   }));
  // };

  // NOT IMPLEMENTED
  // const getSortIndicator = (key) => {
  //   if (sortConfig.key !== key) return ' ↕';
  //   return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  // };

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const sortableColumns = ['title', 'category', 'brand']; // NOT IMPLEMENTED
  const columns = [
    'title',
    'description',
    'category',
    'price',
    'rating',
    'brand',
    'images',
    'thumbnail',
  ];

  return (
    <div className='app-container'>
      <h2 className='app-title'>Product Dashboard</h2>

      {/* Controls Row */}
      <div className='controls-row'>
        <input
          type='text'
          placeholder='Search by title, category, or brand...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
        />
        <div className='records-select-wrapper'>
          <label>Records per page: </label>
          <select
            value={recordsPerPage}
            onChange={handleRecordsChange}
            className='records-select'
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <span className='results-count'>
          Showing {paginatedItems.length} of {filteredItems.length} results
        </span>
      </div>

      {/* Table */}
      <div className='table-wrapper'>
        <table className='product-table'>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  // Sorting NOT IMPLEMENTED
                  // onClick={sortableColumns.includes(col) ? () => handleSort(col) : undefined}
                  // className={sortableColumns.includes(col) ? 'sortable' : ''}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  {/* Sort indicator NOT IMPLEMENTED */}
                  {/* {sortableColumns.includes(col) && getSortIndicator(col)} */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={8} className='empty-row'>
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td className='description-cell'>{item.description}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>⭐ {item.rating}</td>
                  <td>{item.brand || 'N/A'}</td>
                  <td>
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className='product-img'
                      />
                    )}
                  </td>
                  <td>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className='product-img'
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className='pagination-btn'
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={`pagination-btn ${
                currentPage === page ? 'active' : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='pagination-btn'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
