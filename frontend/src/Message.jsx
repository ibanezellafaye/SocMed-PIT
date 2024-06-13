import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Message = () => {
  const { followingId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchMessages();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); // Fetch messages every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/messages/${followingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      setError('Error fetching messages');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error('User not logged in');
      }
      await axios.post(`http://localhost:8000/api/messages`, {
        sender_id: user.id,
        receiver_id: followingId,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setMessage('');
      fetchMessages(); // Optionally, you can fetch messages immediately after sending a new one
    } catch (error) {
      setError('Error sending message');
    }
  };

  const handlebackdashboard = () => {
    navigate('/dashboard');
  };

  const handlebackfollowing = () => {
    navigate('/following');
  };

  const handlebackmessages = () => {
    navigate('/messages');
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <button onClick={handlebackdashboard}>GoBackToDashboard</button>
      </div>
      <div>
        <button onClick={handlebackfollowing}>GoBackToFollowing</button>
      </div>
      <div>
        <button onClick={handlebackmessages}>GoBackToMessages</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="messages-list mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="message mb-2 p-2 border rounded shadow-sm">
            <p><strong>{msg.sender_id === user.id ? 'You' : `${msg.sender.first_name} ${msg.sender.last_name}`}:</strong> {msg.message}</p>
            <p className="text-gray-500 text-sm">{new Date(msg.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Type your message here"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;
