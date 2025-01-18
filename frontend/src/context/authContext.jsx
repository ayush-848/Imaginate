import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/errorHandler';
import LogoutAnimation from '../assets/logoutAnimation';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Configure axios defaults
  axios.defaults.withCredentials = true;  // Important for cookies
  
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
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
          handleSuccess(`Welcome back, ${response.data.user.name}!`);
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
            'Content-Type': 'application/json'
          }
        }
      );

      const result = response.data;

      if (result.success) {
        toast.promise(
          new Promise((resolve) => {
            handleSuccess(result.message);
            setTimeout(resolve, 2000); // Delay to allow toast to show
          }),
          {
            pending: 'Creating your account...',
            success: 'Account created successfully!',
            error: 'Failed to create account.',
          }
        );
        window.location.href = '/login'; // Redirect after the message
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
            'Content-Type': 'application/json'
          }
        }
      );
  
      const { success, message, user } = response.data;
  
      if (success) {
        toast.promise(
          new Promise((resolve) => {
            setUser(user);
            handleSuccess(message || `Welcome back, ${user.name}!`);
            setTimeout(resolve, 2000); // Delay to allow toast to show
          }),
          {
            pending: 'Logging in...',
            success: 'Logged in successfully!',
            error: 'Login failed.',
          }
        );
        window.location.href = '/'; // Redirect after the message
        return true;
      } else {
        handleError(message || 'Login failed.');
        return false;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      handleError(errorMessage); // Make sure to handle error properly
      return false;
    }
  };
  

  // Logout function
  const logout = async () => {
    if (!user) return; // Ensure logout logic runs only if the user is logged in
  
    setLogoutLoading(true);
    try {
      // Make the logout API call
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      // Clear user state
      setUser(null);
  
      // Optional delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('You have been logged out successfully!');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Error during logout.';
      handleError(errorMessage);
    } finally {
      setLogoutLoading(false);
    }
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
        login,
        signup,
        logout,
        loading,
        logoutLoading,
        isAuthenticated: !!user,
      }}
    >
      <LogoutAnimation isVisible={logoutLoading} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
