// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getToken, setToken as saveToken } from '../api/client';

const AuthContext = createContext();

function mapApiRoleToClient(role) {
  if (role === 'requester') return 'student';
  return role;
}

function normalizeUser(u) {
  if (!u) return null;
  return {
    ...u,
    role: mapApiRoleToClient(u.role),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  const logout = useCallback(() => {
    saveToken(null);
    setUser(null);
  }, []);

  const applyAuthPayload = useCallback((token, rawUser) => {
    saveToken(token);
    setUser(normalizeUser(rawUser));
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getToken()) {
        setBooting(false);
        return;
      }
      try {
        const data = await api('/users/me', { auth: true });
        if (!cancelled) setUser(normalizeUser(data));
      } catch {
        if (!cancelled) {
          saveToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email, password) => {
    const data = await api('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    applyAuthPayload(data.token, data.user);
    return normalizeUser(data.user);
  };

  const register = async (name, email, password, clientRole) => {
    const apiRole = clientRole === 'tutor' ? 'tutor' : 'requester';
    const data = await api('/auth/register', {
      method: 'POST',
      body: { name, email, password, role: apiRole },
    });
    applyAuthPayload(data.token, data.user);
    return normalizeUser(data.user);
  };

  const loginAdmin = async (email, password) => {
    const data = await api('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.user.role !== 'admin') {
      throw new Error('This account is not an administrator.');
    }
    applyAuthPayload(data.token, data.user);
    return normalizeUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, booting, login, register, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
