// src/Context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data) => {
    // data: { name, role, token }
    localStorage.setItem('auth', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
