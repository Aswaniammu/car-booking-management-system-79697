import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
function SignupPage() {
  const { signup, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await signup(form.email, form.password, form.name);
    if (success) navigate("/");
  }

  return (
    <div className="auth-form__container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <label>
          Name
          <input
            type="text"
            required
            autoFocus
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            autoComplete="username"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. user@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            autoComplete="new-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
        {error && <div className="auth-form__error">{error}</div>}
        <div style={{ marginTop: 10 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
export default SignupPage;
