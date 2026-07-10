import { useState, useEffect, useCallback } from 'react';
import './App.css';
import AddEmployeeForm from './components/AddEmployeeForm';
import Pagination from './components/Pagination';
import EmployeeCard from './components/EmployeeCard';

// CONSTANTS
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const PAGE_SIZE = 3;

export default function App() {
  // Q2 — Fetch employees from API
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Q4 — Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // ── Q2: Fetch on mount ──────────────────────
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // ── Q3: Add employee handler ────────────────
  const handleAddEmployee = useCallback((newEmp) => {
    setEmployees((prev) => [newEmp, ...prev]);
    setCurrentPage(1); // reset to first page to see new entry
  }, []);

  // ── Q4: Pagination logic ────────────────────
  const totalPages = Math.ceil(employees.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const visibleEmployees = employees.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // ── Render ──────────────────────────────────
  return (
    <div className='app'>
      <header className='app-header'>
        <h1 className='app-title'>Employee Directory</h1>
        <p className='app-subtitle'>Visa — Staff Engineer Assessment</p>
      </header>

      {/* Q3 — Add Employee Form */}
      <section className='section'>
        <AddEmployeeForm onAdd={handleAddEmployee} />
      </section>

      {/* Q2 — Fetched Employees List */}
      <section className='section'>
        <div className='list-header'>
          <h2 className='section-title'>
            Employees <span className='count-badge'>{employees.length}</span>
          </h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className='state-box'>
            <div className='spinner' />
            <p>Fetching employees…</p>
          </div>
        )}

        {/* Error state */}
        {fetchError && (
          <div className='state-box error'>
            <p>⚠ Failed to fetch: {fetchError}</p>
          </div>
        )}

        {/* Q1 — Render employees using EmployeeCard template */}
        {!loading && !fetchError && (
          <>
            <div className='card-grid'>
              {visibleEmployees.map((emp) => (
                <EmployeeCard key={emp.id} employee={emp} />
              ))}
            </div>

            {/* Q4 — Pagination with disabled prev/next */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
