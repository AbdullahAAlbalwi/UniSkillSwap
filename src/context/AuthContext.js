// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    if (role === 'admin') {
      setUser({ id: 99, name: 'Admin User', email, role: 'admin', initials: 'A' });
      return 'admin';
    }
    // Mock: any credentials work
    const isTutor = email.includes('tutor') || role === 'tutor';
    if (isTutor) {
      setUser({ id: 11, name: 'Tutor User', email, role: 'tutor', initials: 'U' });
      return 'tutor';
    }
    setUser({ id: 10, name: 'Student User', email, role: 'student', initials: 'U' });
    return 'student';
  };

  const register = (name, email, role) => {
    const r = role === 'tutor' ? 'tutor' : 'student';
    setUser({ id: 10, name, email, role: r, initials: name.charAt(0).toUpperCase() });
    return r;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
