import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

const LOGIN_URL = API_URL + "/user/login";

export type User = {
  email: string;
  password: string;
  roles?: string[]
};

interface LoginResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    rentalUnit: number;
    address: string;
    city: string;
    zipCode: number;
    role: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

const authProvider = {
  isAuthenticated: false,
  async signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_, false); 
    const res = await fetch(LOGIN_URL, options);
    return handleHttpErrors(res);
  },
};

export type { LoginResponse, LoginRequest };
export { authProvider };