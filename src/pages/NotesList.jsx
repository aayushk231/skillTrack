import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="notes-list-container">
      <div className="header-row">
        <h2>Your Notes</h2>
        <button className="add-btn" onClick={() => navigate('/notes/new')}>+ Create Note</button>
      </div>
      {notes.length === 0 ? (
        <p>No notes found. Create one to get started!</p>
      ) : (
        <div className="grid-container">
          {notes.map(note => (
            <div key={note.id} className="card">
              <h3>{note.title}</h3>
              <p>{note.content.substring(0, 50)}...</p>
              <div className="card-actions">
                <button onClick={() => navigate(`/notes/edit/${note.id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}