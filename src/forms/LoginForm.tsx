import React from "react";
import type { LoginRequest } from "../services/authFacade";
import "./LoginForm.css";

interface Props {
  credentials: LoginRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRegisterClick: () => void;
  error?: string | null;
}

export default function LoginForm({
  credentials,
  onChange,
  onSubmit,
  onRegisterClick,
  error,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
        <h1>
            Login
        </h1>
      <img
        src="https://i.ibb.co/6RmBkqd5/Chat-GPT-Image-Apr-28-2025-01-54-15-PM.png"
        alt="AM Parking Logo"
        className="login-logo"
      />
      <input
        type="text"
        name="email"
        placeholder="Email eller brugernavn"
        value={credentials.email}
        onChange={onChange}
        required
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Adgangskode"
        value={credentials.password}
        onChange={onChange}
        required
      />
      <br />
      <button type="submit">Log ind</button>
      <button type="button" onClick={onRegisterClick}>Opret bruger</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
