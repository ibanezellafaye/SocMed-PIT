import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTheme } from './App'; // Import the theme context

const Message = () => {
  const { userId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { theme } = useTheme(); // Get the current theme
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const authToken = localStorage.getItem('authToken');
      const currentUserId = currentUser.id;
      try {
        const response = await axios.get('http://localhost:8000/api/messages/conversations', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        const filteredConversations = response.data.filter(user => user.id !== currentUserId);
        setConversations(filteredConversations);

        if (userId) {
          let user = filteredConversations.find(user => user.id === parseInt(userId));
          if (user) {
            setSelectedUser(user);
            fetchMessages(user.id);
          } else {
            // Fetch user info if not in conversations
            const userResponse = await axios.get(`http://localhost:8000/api/users/${userId}`, {
              headers: { Authorization: `Bearer ${authToken}` }
            });
            setSelectedUser(userResponse.data);
            setMessages([]);
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (userId) => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`http://localhost:8000/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleUserClick = (user) => {
    if (!selectedUser || selectedUser.id !== user.id) {
      setSelectedUser(user);
      fetchMessages(user.id);
    }
  };

  const handleSendMessage = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post(
        `http://localhost:8000/api/messages/${selectedUser.id}`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`ml-72 w-1/4 p-4 border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
        <h2 className="text-2xl mb-4 mt-20">Conversations</h2>
        <div className="overflow-y-auto">
          {conversations.map(user => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`p-2 cursor-pointer ${selectedUser && selectedUser.id === user.id ? 'bg-blue-500 text-white' : ''} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              {user.first_name} {user.last_name}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 flex flex-col mt-20">
        {selectedUser ? (
          <div className="flex flex-col h-full">
            <h2 className="text-2xl mb-4 p-4">{selectedUser.first_name} {selectedUser.last_name}</h2>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.sender_id === currentUser.id ? 'text-right' : 'text-left'}`}>
                  <div className={`p-2 rounded-md ${message.sender_id === currentUser.id ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <p className="text-sm font-semibold">{message.sender_id === currentUser.id ? `${currentUser.first_name} ${currentUser.last_name}` : `${selectedUser.first_name} ${selectedUser.last_name}`}</p>
                    <p className="text-xs text-gray-400">{moment(message.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-300 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`flex-1 p-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} rounded-md focus:outline-none`}
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">Select a conversation to view messages</div>
        )}
      </div>
    </div>
  );
};

export default Message;
