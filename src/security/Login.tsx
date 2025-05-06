import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider, type LoginRequest } from "../services/authFacade";
import { getUsers, getUser } from "../services/apiFacade";

const Login: React.FC = () => {
  const navigate = useNavigate();
const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authProvider.signIn(credentials);
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.email);
      authProvider.isAuthenticated = true;
      navigate("/"); 
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

    const fetchUsers = async () => {
        try {
        const usersData = await getUsers();
        setUsers(usersData);
        } catch (error) {
        console.error("Error fetching users:", error);
        }
    };

    const fetchUser = async (id: number) => {
        try {
        const userData = await getUser(id);
        console.log("Fetched user data:", userData);
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>

        <button onClick={fetchUsers}>Fetch Users</button>
        <button onClick={() => fetchUser(1)}>Fetch User with ID 1</button>

        <h3>Users:</h3>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email eller brugernavn"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Adgangskode"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Log ind</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    
  );
};

export default Login;
