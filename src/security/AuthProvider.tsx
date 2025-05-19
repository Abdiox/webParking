import { createContext, useState, ReactNode } from "react";
import { useContext } from "react";
import { authProvider, type LoginRequest, type LoginResponse } from "../services/authFacade";

interface AuthContextType {
  signIn: (user: LoginRequest) => Promise<LoginResponse>;
  signOut: () => void;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
  isAdmin: () => boolean;
  email: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const initialEmail = localStorage.getItem("email") || null;
  const [email, setEmail] = useState<string | null>(initialEmail);

  const signIn = async (credentials: LoginRequest) => {
    try {
      const response = await authProvider.signIn(credentials);
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      
      setEmail(response.email);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  const signOut = () => {
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  const isLoggedInAs = (requiredRoles: string[]) => {
    const userRole = localStorage.getItem("role");
    if (!userRole) return false;
    
    return requiredRoles.includes(userRole);
  };
  
  const isAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  };

  return <AuthContext.Provider value={{ signIn, signOut, isLoggedIn, isLoggedInAs, isAdmin, email }}>{children}</AuthContext.Provider>;
}
