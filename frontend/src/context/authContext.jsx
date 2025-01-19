import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils/errorHandler';
import LogoutAnimation from '../assets/logoutAnimation';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  // Load user on initial mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/protected`,
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user); // Include user data (with credits) in the state
        }
      } catch (error) {
        console.error('Error loading user:', error.response?.data?.message || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/create-account`,
        { name, email, password },
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;

      if (result.success) {
        handleSuccess(result.message);
        return true;
      } else {
        handleError(result.message || 'Failed to create account.');
        return false;
      }
    } catch (error) {
      handleError(error.response?.data?.message || 'An unexpected error occurred.');
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const { success, message, user } = response.data;

      if (success) {
        setUser(user); // Store user data, including credits
        handleSuccess(message);
        return true;
      } else {
        handleError(message || 'Login failed.');
        return false;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred.';
      handleError(errorMessage);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    if (!user) return;

    setLogoutLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null); // Clear user state

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Optional delay for smooth transition
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Error during logout.';
      handleError(errorMessage);
    } finally {
      setLogoutLoading(false);
    }
  };

  // Update user credits after an API call
  const updateCredits = (newCredits) => {
    setUser((prevUser) => ({
      ...prevUser,
      userCredits: newCredits,
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userCredits: user?.userCredits || 0, // Export user credits
        login,
        signup,
        logout,
        loading,
        logoutLoading,
        updateCredits, // Expose a function to update credits
        isAuthenticated: !!user,
      }}
    >
      <LogoutAnimation isVisible={logoutLoading} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
