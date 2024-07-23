import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN } from "../constants";
import axios from 'axios';

function GetNote() {

    const [notes, setNotes] = useState(null);
    
    const token = localStorage.getItem(ACCESS_TOKEN)
    const config = {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    }
    useEffect (()=>{
        const fetchImg = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/notes/', config);
                console.log('Note geted:', response.data);
                setNotes(response.data);
            } catch (error) {
                console.error('Error getting note:', error);
            }
        }
        fetchImg();
    }, [])


  return (
    <div>
      <h1> User Notes </h1>
      {notes && 
        <div> {notes.map((note)=>{
            return (
                <>
                    <h1> {note.name} </h1>
                    <p> {note.desc} </p>
                </>
                )
            })} 
        </div>
    }
    </div>
  )
}

export default GetNote
