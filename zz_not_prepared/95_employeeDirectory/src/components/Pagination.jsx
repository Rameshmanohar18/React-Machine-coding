// ─────────────────────────────────────────────
// Q4 — Pagination: Previous / Next with disable logic
// ─────────────────────────────────────────────
export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) {
  // Q4 Answer: disable prev on page 1, disable next on last page
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className='pagination'>
      <button
        className='btn-page'
        onClick={onPrev}
        disabled={isPrevDisabled} // ← disables on first page
        aria-label='Previous page'
      >
        ← Prev
      </button>

      <span className='page-info'>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        className='btn-page'
        onClick={onNext}
        disabled={isNextDisabled} // ← disables on last page
        aria-label='Next page'
      >
        Next →
      </button>
    </div>
  );
}
