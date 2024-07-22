import React, { useState } from 'react';
import api from '../api';

const PostNote = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   try {
    //     const resp = await api.post("/api/token/refresh/", { refresh: refreshToken,});
    //     if (resp.status === 200){ //Successfull
    //         localStorage.setItem(ACCESS_TOKEN, resp.data.access)
    //         setIsAuthorized(true)
    //     }
    //     else
    //         setIsAuthorized(false)
    // }
    // catch (err) {
    //     console.log(err)
    //     setIsAuthorized(false)
    // }
      const response = await api.post('/api/notes/', { name, desc });
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

export default PostNote;