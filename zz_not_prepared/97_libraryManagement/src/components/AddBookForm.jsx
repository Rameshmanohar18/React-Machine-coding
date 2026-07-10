import { useState } from 'react';

const GENRES = [
  'All',
  'Fiction',
  'History',
  'Science',
  'Philosophy',
  'Biography',
];

const EMPTY_FORM = { title: '', author: '', year: '', genre: GENRES[1] };

// Emoji spines for visual interest (cycled by index)
const SPINE_EMOJIS = ['📗', '📘', '📙', '📕', '📓', '📒', '📔', '📖'];

export default function AddBookForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.author.trim()) errs.author = 'Author is required';
    if (form.year && !/^\d{4}$/.test(form.year))
      errs.year = 'Enter a valid 4-digit year';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setSubmitting(true);
    try {
      // Simulate POST — real endpoint would be your books API
      await new Promise((r) => setTimeout(r, 600));

      const newBook = {
        id: `local-${Date.now()}`,
        title: form.title.trim(),
        author: form.author.trim(),
        year: form.year || new Date().getFullYear(),
        genre: form.genre,
        spine: SPINE_EMOJIS[Math.floor(Math.random() * SPINE_EMOJIS.length)],
        issued: false,
      };

      onAdd(newBook);
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='add-form' onSubmit={handleSubmit} noValidate>
      <div className='form-grid'>
        {/* Title */}
        <div className='form-group'>
          <label className='form-label'>Book Title *</label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            placeholder='e.g. The Great Gatsby'
            className={`form-input${errors.title ? ' input-error' : ''}`}
            disabled={submitting}
          />
          {errors.title && <span className='field-error'>{errors.title}</span>}
        </div>

        {/* Author */}
        <div className='form-group'>
          <label className='form-label'>Author *</label>
          <input
            type='text'
            name='author'
            value={form.author}
            onChange={handleChange}
            placeholder='e.g. F. Scott Fitzgerald'
            className={`form-input${errors.author ? ' input-error' : ''}`}
            disabled={submitting}
          />
          {errors.author && (
            <span className='field-error'>{errors.author}</span>
          )}
        </div>

        {/* Year */}
        <div className='form-group'>
          <label className='form-label'>Publish Year</label>
          <input
            type='text'
            name='year'
            value={form.year}
            onChange={handleChange}
            placeholder='e.g. 1925'
            className={`form-input${errors.year ? ' input-error' : ''}`}
            disabled={submitting}
          />
          {errors.year && <span className='field-error'>{errors.year}</span>}
        </div>

        {/* Genre */}
        <div className='form-group'>
          <label className='form-label'>Genre</label>
          <select
            name='genre'
            value={form.genre}
            onChange={handleChange}
            className='form-select'
            disabled={submitting}
          >
            {GENRES.filter((g) => g !== 'All').map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='form-footer'>
        <button type='submit' className='btn-primary' disabled={submitting}>
          {submitting ? '⏳ Adding…' : '+ Add Book'}
        </button>
        {success && (
          <span className='success-toast'>✓ Book added to library!</span>
        )}
      </div>
    </form>
  );
}
