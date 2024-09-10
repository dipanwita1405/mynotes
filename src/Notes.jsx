import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3030')
      .then(res => setNotes(res.data))
      .catch(err => console.error('Error fetching notes:', err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      axios.delete(`http://localhost:3030/delete/${id}`)
        .then(() => {
          // Filter out the deleted note from the state
          setNotes(notes.filter(note => note.id !== id));
        })
        .catch(err => console.error('Error deleting note:', err));
    }
  };

  return (
    <div className='container mt-4 ' style={{ backgroundColor: '#aacef7' }}>
      <div className='d-flex justify-content-between align-items-center mb-3'>
      <Link to="/create" className="btn btn-success mr-3">Add New Note</Link>
        
        <div className='button-container'>
          
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Search..." 
            style={{ width: '200px' }} 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {filteredNotes.length !== 0 ?
        <div className='row'>
          {filteredNotes.map(note => (
            <div key={note.id} className='col-md-4 mb-3'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{note.title}</h5>
                  <p className='card-text text-muted'>{note.content.substring(0, 100)}...</p>
                  <div className='d-flex justify-content-between'>
                    <Link 
                      to={`/update/${note.id}`} 
                      className='btn btn-primary'
                    >
                      Edit
                    </Link>
                    <button 
                      className='btn btn-danger'
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        : <h3>No Notes</h3>
      }
    </div>
  );
};

export default Notes;
