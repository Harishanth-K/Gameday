import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, registerUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  
  const login = async (credentials) => {
    return dispatch(loginUser(credentials));
  };
  
  const register = async (userData) => {
    return dispatch(registerUser(userData));
  };
  
  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we should clear local state
      // The error is likely just from storage cleanup failing
    }
  };
  
  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };
};