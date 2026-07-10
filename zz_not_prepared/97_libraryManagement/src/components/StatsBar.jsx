// ─────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────
export default function StatsBar({ books }) {
  const total = books.length;
  const available = books.filter((b) => !b.issued).length;
  const issued = books.filter((b) => b.issued).length;

  return (
    <div className='stats-bar'>
      <div className='stat-card'>
        <div className='stat-value'>{total}</div>
        <div className='stat-label'>Total Books</div>
      </div>
      <div className='stat-card stat-card--green'>
        <div className='stat-value'>{available}</div>
        <div className='stat-label'>Available</div>
      </div>
      <div className='stat-card stat-card--red'>
        <div className='stat-value'>{issued}</div>
        <div className='stat-label'>Issued Out</div>
      </div>
    </div>
  );
}
