import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const History = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/chats`, {
            withCredentials: true, // Ensure cookies are sent
          });

          if (response.data.success) {
            setChats(response.data.chats);
          } else {
            setError(response.data.message || 'Failed to fetch chats.');
          }
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || 'An error occurred while fetching chat history.');
        } finally {
          setLoading(false);
        }
      };

      fetchChats();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <p className="text-lg font-semibold">Please log in to view your chat history.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <p className="text-lg font-semibold">Loading chat history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Your Chat History</h2>
        {chats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className="p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md"
              >
                <p className="text-sm font-medium">
                  <span className="font-bold">Prompt:</span> {chat.prompt}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-bold">Result:</span> {chat.result}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-bold">Status:</span>{' '}
                  <span
                    className={`${
                      chat.status === 'success' ? 'text-green-500' : 'text-red-500'
                    } font-medium`}
                  >
                    {chat.status}
                  </span>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-bold">Timestamp:</span> {new Date(chat.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-medium">No chat history available.</p>
        )}
      </div>
    </div>
  );
};

export default History;
