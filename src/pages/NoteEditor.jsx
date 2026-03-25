import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Determines if we are in Edit mode

  useEffect(() => {
    if (id) {
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const noteToEdit = savedNotes.find(n => n.id === id);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return alert('Please enter a title and content.');

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    let updatedNotes;

    if (id) {
      // Update existing
      updatedNotes = savedNotes.map(n => n.id === id ? { ...n, title, content } : n);
    } else {
      // Create new
      const newNote = { id: Date.now().toString(), title, content, date: new Date().toLocaleDateString() };
      updatedNotes = [...savedNotes, newNote];
    }

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/notes');
  };

  return (
    <div className="editor-container">
      <h2>{id ? 'Edit Note' : 'Create New Note'}</h2>
      <input 
        type="text" 
        placeholder="Note Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Write your notes here..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        rows="10"
      />
      <div className="button-group">
        <button onClick={handleSave}>Save Note</button>
        <button className="secondary-btn" onClick={() => navigate('/notes')}>Cancel</button>
      </div>
    </div>
  );
}