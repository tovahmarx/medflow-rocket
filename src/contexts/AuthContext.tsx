import React, { createContext, useContext, useState, useCallback } from 'react';
import { users, User, UserRole } from '@/data/mock-data';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (email: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    const found = users.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
