import { useState, useEffect, useCallback, useMemo } from 'react';
import AddBookForm from './AddBookForm';
import Pagination from './Pagination';
import StatsBar from './StatsBar';
import BookCard from './BookCard';

// HELPERS

const GENRES = [
  'All',
  'Fiction',
  'History',
  'Science',
  'Philosophy',
  'Biography',
];

const API_URL =
  'https://openlibrary.org/search.json?q=classic+literature&limit=12&fields=key,title,author_name,first_publish_year,subject';

// Emoji spines for visual interest (cycled by index)
const SPINE_EMOJIS = ['📗', '📘', '📙', '📕', '📓', '📒', '📔', '📖'];

const PAGE_SIZE = 6;

const normaliseBook = (raw, index) => ({
  id: raw.key || `book-${index}`,
  title: raw.title || 'Unknown Title',
  author: raw.author_name?.[0] || 'Unknown Author',
  year: raw.first_publish_year || '—',
  genre: raw.subject?.[0] || GENRES[1 + (index % (GENRES.length - 1))],
  spine: SPINE_EMOJIS[index % SPINE_EMOJIS.length],
  issued: false, // all books start as available
});

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function LibraryApp() {
  // ── Q2: Fetch state ─────────────────────────
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // ── Q4: Search & filter state ───────────────
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  // ── Q4: Pagination state ────────────────────
  const [currentPage, setCurrentPage] = useState(1);

  // ── Q2: Fetch books on mount ─────────────────
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBooks((data.docs || []).map(normaliseBook));
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // ── Q3: Add book handler ─────────────────────
  const handleAddBook = useCallback((newBook) => {
    setBooks((prev) => [newBook, ...prev]);
    setCurrentPage(1); // jump to page 1 to see new book
    setSearch('');
    setActiveGenre('All');
  }, []);

  // ── Q4: Issue / Return toggle ────────────────
  const handleToggleIssue = useCallback((id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, issued: !b.issued } : b))
    );
  }, []);

  // ── Q4: Filter + search (derived, no extra state) ──
  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchGenre =
        activeGenre === 'All' ||
        b.genre.toLowerCase().includes(activeGenre.toLowerCase());
      const matchSearch =
        !search.trim() ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    });
  }, [books, search, activeGenre]);

  // ── Q4: Pagination (derived) ─────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset to page 1 whenever filter/search changes
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };
  const handleGenreChange = (val) => {
    setActiveGenre(val);
    setCurrentPage(1);
  };

  // ── Render ───────────────────────────────────
  return (
    <div className='app'>
      {/* ── Header ── */}
      <header className='app-hero'>
        <div className='hero-inner'>
          <p className='hero-eyebrow'>HackerRank Assessment</p>
          <h1 className='hero-title'>Library Management System</h1>
          <p className='hero-sub'>Staff Software Engineer Questions</p>
        </div>
      </header>

      {/* ── Stats ── */}
      {!loading && !fetchError && <StatsBar books={books} />}

      {/* ── Q3: Add Book ── */}
      <section className='section' style={{ animationDelay: '0.1s' }}>
        <div className='section-label'>
          <span className='q-num'>3</span>
          Add Book
        </div>
        <h2 className='section-title'>Add a New Book</h2>
        <AddBookForm onAdd={handleAddBook} />
      </section>

      {/* ── Q1 + Q2 + Q4: Book Listing ── */}
      <section className='section' style={{ animationDelay: '0.2s' }}>
        <div className='section-label'>
          <span className='q-num'>1</span>
          Book Template ·{' '}
          <span className='q-num' style={{ marginLeft: 4 }}>
            2
          </span>
          Fetch ·{' '}
          <span className='q-num' style={{ marginLeft: 4 }}>
            4
          </span>
          Search &amp; Paginate
        </div>

        <h2 className='section-title'>
          Library Catalogue
          {!loading && (
            <span className='count-chip'>{filtered.length} books</span>
          )}
        </h2>

        {/* Q4 — Search input */}
        <div className='search-wrap'>
          <span className='search-icon'>🔍</span>
          <input
            type='text'
            className='search-input'
            placeholder='Search by title or author…'
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {search && (
            <button
              className='search-clear'
              onClick={() => handleSearchChange('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Q4 — Genre filter tabs */}
        <div className='filter-tabs'>
          {GENRES.map((g) => (
            <button
              key={g}
              className={`filter-tab${
                activeGenre === g ? ' filter-tab--active' : ''
              }`}
              onClick={() => handleGenreChange(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className='state-box'>
            <div className='spinner' />
            <p>Fetching books from Open Library…</p>
          </div>
        )}

        {/* Error state */}
        {fetchError && (
          <div className='state-box error'>
            <p>⚠ Could not fetch books: {fetchError}</p>
          </div>
        )}

        {/* Q1 — Render books using BookCard template */}
        {!loading && !fetchError && (
          <>
            {visible.length === 0 ? (
              <div className='empty-state'>
                <div className='empty-icon'>📭</div>
                <p>No books match your search.</p>
              </div>
            ) : (
              <div className='books-grid'>
                {visible.map((book, i) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    index={i}
                    onToggleIssue={handleToggleIssue}
                  />
                ))}
              </div>
            )}

            {/* Q4 — Pagination with disabled prev/next */}
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
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
