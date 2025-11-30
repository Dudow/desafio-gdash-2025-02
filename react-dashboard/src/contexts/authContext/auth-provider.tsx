import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { authService } from "@/services/auth";
import type { User } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) validateToken();
    else setLoading(false);
  }, []);

  const validateToken = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { token, user: userData } = await authService.login(email, password);
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // TO DO: redirect to login
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
