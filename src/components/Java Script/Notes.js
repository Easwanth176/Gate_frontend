import React, { useState } from 'react';
import '../CSS/Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() === '') {
      return; // Don't add an empty note
    }
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h1>My Notes</h1>

      <div className="note-form">
        <input
          type="text"
          placeholder="Add a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      {notes.length === 0 ? (
        <p>No notes to display. Add one above.</p>
      ) : (
        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index}>
              <div className="note">
                <p>{note}  <button onClick={() => removeNote(index)}>Delete</button></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
