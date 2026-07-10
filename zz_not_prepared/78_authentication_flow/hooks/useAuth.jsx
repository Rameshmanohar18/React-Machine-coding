import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage (offline storage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (storedUser && token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, username, password) => {
    const res = await api.signup(email, username, password);
    const { userDetails, accessToken, refreshToken } = res.data;
    localStorage.setItem('user', JSON.stringify(userDetails));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userDetails);
  };

  const login = async (email, password) => {
    const res = await api.login(email, password);
    const { userDetails, accessToken, refreshToken } = res.data;
    localStorage.setItem('user', JSON.stringify(userDetails));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userDetails);
  };

  const oauthLogin = async (provider) => {
    const res = await api.oauthLogin(provider);
    const { userDetails, accessToken, refreshToken } = res.data;
    localStorage.setItem('user', JSON.stringify(userDetails));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userDetails);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signup,
        login,
        oauthLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};
