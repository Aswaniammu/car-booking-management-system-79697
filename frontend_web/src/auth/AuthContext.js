import React, { createContext, useState, useEffect, useContext } from "react";
import { login as apiLogin, signup as apiSignup } from "../api";

// Context for authentication state
const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Auth Provider to wrap entire app */
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Persist user/token in localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    setLoading(true);
    setError("");
    try {
      const res = await apiLogin(email, password);
      setUser(res.user);
      setToken(res.token);
      setLoading(false);
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  }

  // PUBLIC_INTERFACE
  async function signup(email, password, name) {
    setLoading(true);
    setError("");
    try {
      const res = await apiSignup(email, password, name);
      setUser(res.user);
      setToken(res.token);
      setLoading(false);
      return res.user;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  }

  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
    setToken("");
    setError("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access authentication context */
  return useContext(AuthContext);
}
