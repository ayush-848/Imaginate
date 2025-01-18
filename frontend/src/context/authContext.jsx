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
  axios.defaults.withCredentials = true;  // Important for cookies
  
  // Load user on initial mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/protected`, // Using process.env for environment variable
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
        handleError(error.response?.data?.message || 'Error loading user data.');
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
        handleSuccess(result.message);
        window.location.href = '/login';
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
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials,
        { withCredentials: true }
      );

      const userData = response.data.user;
      setUser(userData); // Set user data after successful login
      handleSuccess('Login successful');
    } catch (error) {
      console.error('Error logging in:', error.message);
      handleError(error.response?.data?.message || 'Error logging in');
    }
  };

  // Logout function
  const logout = async () => {
    if (!user) return; // Ensure logout logic runs only if the user is logged in
    
    setLogoutLoading(true);
    try {
      // Show logout animation
      handleSuccess('Logging out...', { autoClose: 1000 });
  
      // Make the logout API call
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      // Clear user state after logout
      setUser(null);
  
      // Optional delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Redirect to the home page
      window.location.href = '/';
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
      {/* Only show the logout animation while logout is in progress */}
      <LogoutAnimation isVisible={logoutLoading} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
