import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNotes = ({ isEditing = false, existingNote = {} }) => {
  const [title, setTitle] = useState(existingNote.title || '');
  const [content, setContent] = useState(existingNote.content || '');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3030/update/${existingNote.id}`, { title, content });
      } else {
        await axios.post('http://localhost:3030/create', { title, content });
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save the note. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='d-flex align-items-center flex-column mt-3'>
      <h1>{isEditing ? 'Edit Note' : 'Add Note'}</h1>
      <form className='w-50' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea 
            className="form-control" 
            id="content" 
            rows="4" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content" 
            required 
          />
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotes;
