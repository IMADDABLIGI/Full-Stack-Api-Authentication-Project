import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

const CreateNote = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://127.0.0.1:8000/api/notes/', { name, desc }, config);
      console.log('Note created:', response.data);

      // Reset the form fields
      setName('');
      setDesc('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;