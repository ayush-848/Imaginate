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

  // Load user on initial mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/protected`,
          { withCredentials: true }
        );

        setUser(response.data.user);
        if (response.data.user) {
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
        { name, email, password }
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
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { success, message, user } = response.data;

      if (success) {
        setUser(user);
        handleSuccess(message);
        window.location.href = '/';
        return true;
      } else {
        handleError(message || 'Login failed.');
        return false;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred.';
      handleError(errorMessage);
    }
  };

  // Logout function with animation
  const logout = async () => {
    setLogoutLoading(true);
    try {
      handleSuccess('Logging out...', { autoClose: 1000 });
  
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      setUser(null);
  
      // Delay for animation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.href = '/';
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Error during logout.';
      handleError(errorMessage);
    } finally {
      setLogoutLoading(false);
    }
  };
  

  // Loading screen while checking authentication
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
