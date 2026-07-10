import { useState } from 'react';
import SortModal from './SortModal';
import ApartmentCard from './ApartmentCard';
import usePersistedSort from '../customHooks/usePersistedSort';

// ─── Sample Data ───
const APARTMENTS = [
  {
    id: 1,
    title: 'Skyline Loft',
    price: 2400,
    description:
      'A modern loft with panoramic city views and floor-to-ceiling windows.',
    image: '🏙️',
    beds: 2,
    baths: 1,
    sqft: 950,
  },
  {
    id: 2,
    title: 'Amber Grove',
    price: 1800,
    description:
      'Cozy apartment nestled in a tree-lined neighborhood with a private balcony.',
    image: '🌳',
    beds: 1,
    baths: 1,
    sqft: 720,
  },
  {
    id: 3,
    title: 'Pacific Breeze',
    price: 3100,
    description:
      'Beachfront living with ocean sounds and sunset views from every room.',
    image: '🌊',
    beds: 3,
    baths: 2,
    sqft: 1400,
  },
  {
    id: 4,
    title: 'Downtown Edge',
    price: 2750,
    description: 'Industrial-chic studio in the heart of the arts district.',
    image: '🎨',
    beds: 1,
    baths: 1,
    sqft: 680,
  },
  {
    id: 5,
    title: 'Cedar Heights',
    price: 1950,
    description:
      'Bright and airy unit with hardwood floors and a renovated kitchen.',
    image: '🪵',
    beds: 2,
    baths: 1,
    sqft: 880,
  },
  {
    id: 6,
    title: 'Velvet Quarter',
    price: 4200,
    description:
      'Luxury penthouse with a rooftop terrace and concierge service.',
    image: '✨',
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
];

// ─── Sort Logic ───
const sortApartments = (apartments, sortKey, sortDirection) => {
  if (!sortKey) return apartments;
  const sorted = [...apartments];
  const dir = sortDirection === 'desc' ? -1 : 1;
  switch (sortKey) {
    case 'price':
      return sorted.sort((a, b) => (a.price - b.price) * dir);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title) * dir);
    case 'description':
      return sorted.sort(
        (a, b) => a.description.localeCompare(b.description) * dir
      );
    default:
      return sorted;
  }
};

// ─── Main App ───
export default function SortableApartments() {
  const { sortKey, sortDirection, setSortKey, setSortDirection, clearSort } =
    usePersistedSort();
  const [modalOpen, setModalOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleSortSelect = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setAnimKey((k) => k + 1);
  };

  const handleClear = () => {
    clearSort();
    setAnimKey((k) => k + 1);
  };

  const sorted = sortApartments(APARTMENTS, sortKey, sortDirection);
  const sortLabels = {
    price: 'Price',
    title: 'Title',
    description: 'Description',
  };

  return (
    <div className='page'>
      <div className='header'>
        <div>
          <h1 className='heading'>Apartments</h1>
          <p className='subheading'>
            {sorted.length} listings
            {sortKey && (
              <span className='sort-badge'>
                {sortLabels[sortKey]} {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className='sort-trigger'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.2'
            strokeLinecap='round'
          >
            <path d='M3 6h18M6 12h12M9 18h6' />
          </svg>
          <span>{sortKey ? sortLabels[sortKey] : 'Sort'}</span>
          {sortKey && <span className='active-dot' />}
        </button>
      </div>

      <div className='grid' key={animKey}>
        {sorted.map((apt, i) => (
          <ApartmentCard key={apt.id} apartment={apt} index={i} />
        ))}
      </div>

      <SortModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortSelect={handleSortSelect}
        onClear={handleClear}
      />
    </div>
  );
}
