// https://dummyjson.com/products

// Search component with filter, sorting, and pagination

// Table columns (th):
// title, description, category, price, rating, brand, images, thumbnail

// Filter (search): title, category, brand
// Sorting (clickable th): title, category, brand
// Pagination: 10 / 20 records per page

// Coding approach:

// 1. useState:
//    - searchQuery → tracks search input value
//    - items → stores original API data (never mutated)
//    - currentPage → tracks active page number
//    - recordsPerPage → tracks how many rows to show (10 or 20)
//    - sortConfig → { key, direction } for sort column and asc/desc toggle

// 2. useEffect → fetch API call to https://dummyjson.com/products?limit=100 → save into items

// 3. Derived state (computed on every render, no extra useState needed):
//    - filteredItems → items.filter() using .toLowerCase().includes(searchQuery) on title, category, brand
//    - sortedItems → [...filteredItems].sort() using a<b ? -1 : 1 with direction toggle
//    - paginatedItems → sortedItems.slice(startIndex, startIndex + recordsPerPage)
//    - totalPages → Math.ceil(sortedItems.length / recordsPerPage)

// 4. handleSearchChange(e) → setSearchQuery + setCurrentPage(1) to reset pagination on new search

// 5. handleSort(key) → setSortConfig with functional update:
//    - same key + asc → flip to desc
//    - otherwise → set to asc
//    - getSortIndicator(key) → returns ↕ (unsorted), ↑ (asc), ↓ (desc)

// 6. handlePagination(page) → boundary check (1 to totalPages) → setCurrentPage

// 7. handleRecordsChange(e) → setRecordsPerPage + setCurrentPage(1)

// 8. JSX structure:
//    - controls-row → search input + records-per-page select + results count
//    - table → thead with columns.map() (sortable columns get onClick + className="sortable")
//           → tbody with paginatedItems.map() (empty state with colSpan if no results)
//    - pagination → Prev button + page number buttons (Array.from) + Next button
//                 → disabled logic on Prev (page===1) and Next (page===totalPages)
//                 → active class on current page button

// Key pattern: items state is NEVER mutated — filter/sort/paginate are all derived.
// This avoids the common bug of losing original data when filtering.
