import { useContext } from 'react';
import { authContext } from '../context/authContext';

const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    console.error('AuthContext is undefined. Ensure AuthProvider is properly set up.');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;