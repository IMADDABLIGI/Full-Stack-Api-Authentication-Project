import React from 'react'

function Home() {

  const socket = new WebSocket('ws://127.0.0.1:8000/ws/api/');
    socket.onopen = function() {
        console.log('WebSocket connection established');
        socket.send(JSON.stringify({ message: 'Hello' }));
    };
    socket.onmessage = function(event) {
        console.log('Message from server:', event.data);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const message = e.target.message.value;
      if (message)
        socket.send(JSON.stringify({ message }));
      e.target.reset(); // Reset the form
    };
  
    return (
      <div className='home--page'>
        <h1>Let's chat!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

export default Home
