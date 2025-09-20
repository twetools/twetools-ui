import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDevMode } from "./DevModeContext";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { enabled: devMode } = useDevMode();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // In dev mode, default to not authenticated
    return devMode ? false : true;
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
