import { useState, useMemo } from 'react';

// Sample data
const INITIAL_DATA = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    department: 'Engineering',
    salary: 75000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Designer',
    department: 'Design',
    salary: 70000,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Manager',
    department: 'Engineering',
    salary: 90000,
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Developer',
    department: 'Engineering',
    salary: 80000,
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Designer',
    department: 'Design',
    salary: 65000,
  },
  {
    id: 6,
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Developer',
    department: 'Engineering',
    salary: 72000,
  },
  {
    id: 7,
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'Manager',
    department: 'Marketing',
    salary: 85000,
  },
  {
    id: 8,
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'Developer',
    department: 'Engineering',
    salary: 78000,
  },
];

function DataGrid() {
  const [data] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState({
    role: '',
    department: '',
  });

  // Get unique values for dropdown filters
  const uniqueRoles = useMemo(
    () => [...new Set(data.map((item) => item.role))],
    [data]
  );

  const uniqueDepartments = useMemo(
    () => [...new Set(data.map((item) => item.department))],
    [data]
  );

  // Filter data based on search and column filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Global search
      const matchesSearch =
        searchTerm === '' ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Column filters
      const matchesRole =
        columnFilters.role === '' || item.role === columnFilters.role;
      const matchesDepartment =
        columnFilters.department === '' ||
        item.department === columnFilters.department;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [data, searchTerm, columnFilters]);

  // Handle column filter change
  const handleColumnFilterChange = (column, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  // Export to CSV
  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Department', 'Salary'];
    const csvData = filteredData.map((item) => [
      item.id,
      item.name,
      item.email,
      item.role,
      item.department,
      item.salary,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setColumnFilters({
      role: '',
      department: '',
    });
  };

  return (
    <div className='container'>
      <h1>Data Grid with Filters</h1>

      {/* Controls Section */}
      <div className='controls'>
        {/* Global Search */}
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search across all columns...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
        </div>

        {/* Column Filters */}
        <div className='filters'>
          <select
            value={columnFilters.role}
            onChange={(e) => handleColumnFilterChange('role', e.target.value)}
            className='filter-select'
          >
            <option value=''>All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={columnFilters.department}
            onChange={(e) =>
              handleColumnFilterChange('department', e.target.value)
            }
            className='filter-select'
          >
            <option value=''>All Departments</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className='actions'>
          <button onClick={handleClearFilters} className='btn btn-clear'>
            Clear Filters
          </button>
          <button onClick={handleExport} className='btn btn-export'>
            Export CSV
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className='results-info'>
        Showing {filteredData.length} of {data.length} records
      </div>

      {/* Data Table */}
      <div className='table-wrapper'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.department}</td>
                  <td>${item.salary.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='no-results'>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataGrid;
