// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { sender: 'user', text: input }];
    setChat(newChat);
    
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      setChat([...newChat, { sender: 'bot', text: res.data.response }]);
    } catch (err) {
      console.error(err);
    }
    
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="App">
      <h1 className="title">🤖 ShopAssist🛒</h1>
      <div className="chat-container">
        <div className="chat-box">
          {chat.map((c, idx) => (
            <div key={idx} className={`message ${c.sender}`}>
              {c.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask me about products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );

  
}
console.log("success");


export default App;
