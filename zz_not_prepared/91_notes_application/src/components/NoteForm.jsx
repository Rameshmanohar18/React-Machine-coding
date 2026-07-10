import { useState, useEffect } from 'react';

// Available color palette — tweak or add more as needed
const COLORS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Yellow', value: '#fef9c3' },
  { label: 'Blue', value: '#dbeafe' },
  { label: 'Green', value: '#dcfce7' },
  { label: 'Pink', value: '#fce7f3' },
  { label: 'Orange', value: '#ffedd5' },
];

export default function NoteForm({ editingNote, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // Default color is White when adding a new note
  const [color, setColor] = useState(COLORS[0].value);

  // Pre-fill all three fields when editing an existing note
  useEffect(() => {
    setTitle(editingNote?.title ?? '');
    setBody(editingNote?.body ?? '');
    setColor(editingNote?.color ?? COLORS[0].value);
  }, [editingNote]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    // Pass color along with title and body to the parent
    onSave({ title: title.trim(), body: body.trim(), color });
    setTitle('');
    setBody('');
    setColor(COLORS[0].value); // reset to default after saving
  }

  return (
    <form className='note-form' onSubmit={handleSubmit}>
      <h2 className='form-heading'>{editingNote ? 'Edit Note' : 'Add Note'}</h2>

      <input
        className='form-input'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className='form-textarea'
        placeholder='Write your note...'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
      />

      {/* Color picker: a row of clickable colored circles */}
      <div className='color-picker'>
        {COLORS.map((c) => (
          <button
            key={c.value}
            type='button' // prevent form submit on click
            title={c.label}
            className={`color-dot ${
              color === c.value ? 'color-dot--selected' : ''
            }`}
            style={{ background: c.value }}
            onClick={() => setColor(c.value)}
          />
        ))}
      </div>

      <div className='form-actions'>
        <button className='btn btn-primary' type='submit'>
          {editingNote ? 'Update' : 'Add Note'}
        </button>
        {editingNote && (
          <button
            className='btn btn-secondary'
            type='button'
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
