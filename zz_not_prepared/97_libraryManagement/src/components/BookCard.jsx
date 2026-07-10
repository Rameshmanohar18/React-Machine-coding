// ─────────────────────────────────────────────
// Q1 — BookCard: render book in given HTML template
// ─────────────────────────────────────────────
export default function BookCard({ book, onToggleIssue, index }) {
  return (
    <div
      className={`book-card${book.issued ? ' book-card--issued' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }} /* dynamic — stays inline */
    >
      {/* Book spine with emoji cover */}
      <div className='book-spine'>{book.spine}</div>

      {/* Book details */}
      <div className='book-content'>
        <div className='book-header'>
          <h3 className='book-title'>{book.title}</h3>
          <span
            className={`book-status book-status--${
              book.issued ? 'issued' : 'available'
            }`}
          >
            {book.issued ? 'Issued' : 'Available'}
          </span>
        </div>

        <p className='book-author'>by {book.author}</p>

        <div className='book-meta-row'>
          <span className='book-meta-chip'>📅 {book.year}</span>
          <span className='book-meta-chip'>🏷 {book.genre}</span>
        </div>

        {/* Q4: Issue / Return toggle button */}
        <div className='book-actions'>
          <button
            className={`btn-issue btn-issue--${
              book.issued ? 'issued' : 'available'
            }`}
            onClick={() => onToggleIssue(book.id)}
          >
            {book.issued ? '↩ Return Book' : '↗ Issue Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
