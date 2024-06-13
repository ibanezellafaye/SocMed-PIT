// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const Message = () => {
//   const { followingId } = useParams();
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     fetchMessages();

//     // Set up polling
//     const intervalId = setInterval(() => {
//       fetchMessages();
//     }, 5000); // Fetch messages every 5 seconds

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/messages/${followingId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setMessages(response.data);
//     } catch (error) {
//       setError('Error fetching messages');
//     }
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       if (!user) {
//         throw new Error('User not logged in');
//       }
//       await axios.post(`http://localhost:8000/api/messages`, {
//         sender_id: user.id,
//         receiver_id: followingId,
//         message,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setMessage('');
//       fetchMessages(); // Optionally, you can fetch messages immediately after sending a new one
//     } catch (error) {
//       setError('Error sending message');
//     }
//   };

//   const handlebackdashboard = () => {
//     navigate('/dashboard');
//   };

//   const handlebackfollowing = () => {
//     navigate('/following');
//   };

//   const handlebackmessages = () => {
//     navigate('/messages');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div>
//         <button onClick={handlebackdashboard}>GoBackToDashboard</button>
//       </div>
//       <div>
//         <button onClick={handlebackfollowing}>GoBackToFollowing</button>
//       </div>
//       <div>
//         <button onClick={handlebackmessages}>GoBackToMessages</button>
//       </div>
//       <h2 className="text-2xl font-bold mb-4">Messages</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="messages-list mb-4">
//         {messages.map((msg) => (
//           <div key={msg.id} className="message mb-2 p-2 border rounded shadow-sm">
//             <p><strong>{msg.sender_id === user.id ? 'You' : `${msg.sender.first_name} ${msg.sender.last_name}`}:</strong> {msg.message}</p>
//             <p className="text-gray-500 text-sm">{new Date(msg.created_at).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage}>
//         <textarea
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Type your message here"
//           value={message}
//           onChange={handleMessageChange}
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Message;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Message = () => {
  const { followingId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000); // Fetch messages every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 bg-gray-900 fixed top-0 left-0 w-full z-10 ">
        <div className="mb-4">
          <button
            onClick={handlebackdashboard}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Go Back To Dashboard
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={handlebackfollowing}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Go Back To Following
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={handlebackmessages}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Go Back To Messages
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto pt-64 px-4">
        {error && <p className="text-red-500 p-4">{error}</p>}
        <div className="bg-gray-800 p-4 rounded h-full overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`message mb-2 p-2 border border-gray-700 rounded shadow-sm bg-gray-800 ${msg.sender_id === user.id ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-400 text-sm">{new Date(msg.created_at).toLocaleString()}</p>
              <p><strong>{msg.sender_id === user.id ? 'You' : `${msg.sender.first_name} ${msg.sender.last_name}`}:</strong></p>
              <p>{msg.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-gray-900 p-4 flex items-center">
        <textarea
          className="flex-grow p-2 mr-2 border border-gray-700 rounded bg-gray-800 text-white"
          placeholder="Type your message here"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit" onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
