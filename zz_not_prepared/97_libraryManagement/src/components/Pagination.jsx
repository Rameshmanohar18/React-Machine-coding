// ─────────────────────────────────────────────
// Q4 — Pagination with disabled prev / next
// ─────────────────────────────────────────────
export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  // Disable prev on first page, disable next on last page
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className='pagination'>
      <button
        className='btn-page'
        onClick={onPrev}
        disabled={isPrevDisabled} // ← Q4 answer: disabled on page 1
        aria-label='Previous page'
      >
        ← Prev
      </button>

      <span className='page-info'>
        Page <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
      </span>

      <button
        className='btn-page'
        onClick={onNext}
        disabled={isNextDisabled} // ← Q4 answer: disabled on last page
        aria-label='Next page'
      >
        Next →
      </button>
    </div>
  );
}
