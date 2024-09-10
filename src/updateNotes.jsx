import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateNotes = () => {
  const { id } = useParams(); // Get the note ID from URL parameters
  const [note, setNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the note data when the component mounts
    axios.get(`http://localhost:3030/notes/${id}`)
      .then(res => {
        setNote({
          title: res.data.title,
          content: res.data.content
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching note:', err);
        setLoading(false); // Ensure loading is false even on error
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/update/${id}`, note)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.error('Error updating note:', err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container mt-4'>
      <h1>Update Note</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title</label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>Content</label>
          <textarea
            className='form-control'
            id='content'
            name='content'
            rows='5'
            value={note.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNotes;
