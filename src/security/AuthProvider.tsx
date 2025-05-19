import { createContext, useState, ReactNode } from "react";
import { useContext } from "react";
import type { LoginResponse, LoginRequest } from "../services/authFacade";

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
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const initialEmail = localStorage.getItem("email") || null;
  const [email, setEmail] = useState<string | null>(initialEmail);

  const signIn = async (user_: LoginRequest) => {
    return { email: "sample", token: "sampletoken", roles: ["user"] };
  };

  const signOut = () => {
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("roles");
  };

  const isLoggedIn = () => {
    return email != null;
  };

  const isLoggedInAs = (role: string[]) => {
    const roles: Array<string> = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.some((r) => role.includes(r));
  };

  const isAdmin = () => {
    const roles: Array<string> = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes("ADMIN");
  };

  return <AuthContext.Provider value={{ signIn, signOut, isLoggedIn, isLoggedInAs, isAdmin, email }}>{children}</AuthContext.Provider>;
}
