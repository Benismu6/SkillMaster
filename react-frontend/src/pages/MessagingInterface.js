import React, { useState } from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/messaging-interface.css'; // Page-specific styles

function MessagingInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, type: 'sent' };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate a response
    setTimeout(() => {
      const response = { text: 'This is a simulated response.', type: 'received' };
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'sent' ? 'sent' : 'received'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button id="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MessagingInterface;
