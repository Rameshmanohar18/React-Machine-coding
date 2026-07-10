// ─── Sort Modal ───
import { useEffect, useRef } from 'react';

export default function SortModal({
  isOpen,
  onClose,
  sortKey,
  sortDirection,
  onSortSelect,
  onClear,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === 'Escape' && onClose();
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = [
    { key: 'price', label: 'Price', icon: '💰' },
    { key: 'title', label: 'Title', icon: '🔤' },
    { key: 'description', label: 'Description', icon: '📝' },
  ];

  return (
    <div className='overlay'>
      <div ref={modalRef} className='modal'>
        <div className='modal-header'>
          <h2 className='modal-title'>Sort by</h2>
          <button onClick={onClose} className='close-btn' aria-label='Close'>
            ✕
          </button>
        </div>
        <div className='divider' />

        <div className='options-list'>
          {options.map((opt) => {
            const isActive = sortKey === opt.key;

            const dirLabel = isActive
              ? sortDirection === 'asc'
                ? opt.key === 'price'
                  ? 'Low → High'
                  : 'A → Z'
                : opt.key === 'price'
                ? 'High → Low'
                : 'Z → A'
              : opt.key === 'price'
              ? 'Low → High'
              : 'A → Z';

            return (
              <button
                key={opt.key}
                onClick={() => onSortSelect(opt.key)}
                className={`option-btn${isActive ? ' option-btn--active' : ''}`}
              >
                <span className='option-icon'>{opt.icon}</span>
                <div className='option-text'>
                  <span className='option-label'>{opt.label}</span>
                  <span className='option-sub'>
                    {dirLabel}
                    {isActive && ' · tap to flip'}
                  </span>
                </div>
                {isActive && (
                  <span className='dir-arrow'>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {sortKey && (
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className='clear-btn'
          >
            Clear sorting
          </button>
        )}
      </div>
    </div>
  );
}
