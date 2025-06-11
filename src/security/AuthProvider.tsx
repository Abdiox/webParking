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
  userId: string | null;
  userRole: string | null;
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
  const initialUserId = localStorage.getItem("userId") || null;
  const initialUserRole = localStorage.getItem("role") || null;
  
  const [email, setEmail] = useState<string | null>(initialEmail);
  const [userId, setUserId] = useState<string | null>(initialUserId);
  const [userRole, setUserRole] = useState<string | null>(initialUserRole);

  const signIn = async (credentials: LoginRequest) => {
    try {
      const response = await authProvider.signIn(credentials);
      
      // Store token and user data from response
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.user.email);
      localStorage.setItem("userId", response.user.id.toString());
      localStorage.setItem("role", response.user.role);
      
      // Update state
      setEmail(response.user.email);
      setUserId(response.user.id.toString());
      setUserRole(response.user.role);
      
      console.log("Login successful, user data:", {
        email: response.user.email,
        userId: response.user.id,
        role: response.user.role
      });
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  const signOut = () => {
    // Clear state
    setEmail(null);
    setUserId(null);
    setUserRole(null);
    
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    
    console.log("User signed out");
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    
    return token !== null && role !== null && userId !== null;
  };

  const isLoggedInAs = (requiredRoles: string[]) => {
    if (!isLoggedIn()) return false;
    
    const userRole = localStorage.getItem("role");
    if (!userRole) return false;
    
    return requiredRoles.includes(userRole);
  };
  
  const isAdmin = () => {
    if (!isLoggedIn()) return false;
    
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  };

  return (
    <AuthContext.Provider 
      value={{ 
        signIn, 
        signOut, 
        isLoggedIn, 
        isLoggedInAs, 
        isAdmin, 
        email,
        userId,
        userRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}