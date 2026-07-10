import { useState } from 'react';
import './index.css';

import initialNotes from './data/initialNotes';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';

export default function App() {
  // All notes stored as an array of { id, title, body }
  const [notes, setNotes] = useState(initialNotes);

  // null = we're adding a new note
  // a note object = we're currently editing that note
  const [editingNote, setEditingNote] = useState(null);

  // Called by NoteForm when the user submits the form
  // Now also receives `color` from the form
  function handleSave({ title, body, color }) {
    if (editingNote) {
      // EDIT: replace the matching note, including the updated color
      setNotes(
        notes.map((n) =>
          n.id === editingNote.id ? { ...n, title, body, color } : n
        )
      );
      setEditingNote(null); // exit edit mode after saving
    } else {
      // ADD: create a new note with a unique id using Date.now()
      const newNote = { id: Date.now(), title, body, color };
      setNotes([newNote, ...notes]); // prepend so newest appears first
    }
  }

  // Called when user clicks Edit on a NoteCard
  // Sets editingNote, which causes NoteForm to switch to edit mode
  function handleEdit(note) {
    setEditingNote(note);
  }

  // Called when user clicks Delete on a NoteCard
  // Filters out the note with the matching id, keeping the rest
  function handleDelete(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  // Called when user clicks Cancel in the edit form
  // Clears editingNote so the form switches back to "add" mode
  function handleCancel() {
    setEditingNote(null);
  }

  return (
    <div className='app'>
      <header className='header'>
        <h1>📝 Notes</h1>
      </header>

      <main className='main'>
        {/* Left column: the form (add or edit depending on editingNote) */}
        <aside className='sidebar'>
          <NoteForm
            editingNote={editingNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </aside>

        {/* Right column: the list of notes */}
        <section className='notes-grid'>
          {notes.length === 0 && (
            <p className='empty-state'>No notes yet. Add one!</p>
          )}

          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
