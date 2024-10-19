import React from 'react'
import { useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Form.css"

function Form({route, method}) {
    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const type = method === 'login' ? 'Login': 'Register'
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createSocket = () => {
            const socket = new WebSocket('ws://127.0.0.1:8000/ws/api/');
                socket.onopen = function() {
                    console.log('WebSocket connection established');
                    socket.send(JSON.stringify({ message: 'Hello' }));
                };
                socket.onmessage = function(event) {
                    console.log('Message from server:', event.data);
                };
        }
        try {
            const res = await api.post(route, { username, password })
            if (method === "login"){
                if (res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                    // createSocket();
                    
                    navigate("/");
                }
            }
            else 
                navigate("/login")
        } catch (err) {
            alert(err)
        }
    }   

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1> {type} </h1>
            <input
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='UserName...'
            />
            <input
                className='form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password...'
            />
            <button className="form-button" type="submit"> {type} </button>
            {method === "login" && <Link className="form-register" to="/register"> Register </Link>}
        </form>
  )
}

export default Form
