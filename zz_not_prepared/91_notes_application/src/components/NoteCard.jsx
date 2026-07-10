export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    // Apply the note's chosen color as the card background via inline style.
    // This is the ONE case where inline style makes sense — it's dynamic data,
    // not a design decision, so it can't live in a CSS class.
    <div className='note-card' style={{ background: note.color }}>
      <h3 className='note-title'>{note.title}</h3>
      {note.body && <p className='note-body'>{note.body}</p>}

      <div className='note-actions'>
        <button className='btn btn-secondary' onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className='btn btn-danger' onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
