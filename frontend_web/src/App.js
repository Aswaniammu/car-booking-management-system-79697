import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CarListPage from "./pages/CarListPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import BookingPage from "./pages/BookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";

// Layout component
function MainLayout({ children, showSidebar = true }) {
  return (
    <div className="main-layout__root">
      <HeaderNav />
      <div className="main-layout__body">
        {showSidebar && <Sidebar />}
        <main className="main-layout__content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

// Header/navigation
function HeaderNav() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  return (
    <header className="header-navbar">
      <div className="navbar-brand">
        <span className="brand-accent">🚗</span>
        <Link to="/" className="brand-title">
          CarBookit
        </Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Search</Link>
        {isAuthenticated && <Link to="/history">My Bookings</Link>}
        {!isAuthenticated && <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>}
        {!isAuthenticated && <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>Sign Up</Link>}
        {isAuthenticated && (
          <button className="logout-btn" onClick={logout} title="Logout">
            Logout
          </button>
        )}
      </nav>
      <ThemeToggle />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer-root">
      <span>
        &copy; {new Date().getFullYear()} &ndash; CarBookit. All rights reserved.
      </span>
    </footer>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Pass theme to ThemeToggle via context (simplified for brevity)
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <CarListPage />
              </MainLayout>
            }
          />
          <Route
            path="/cars/:id/book"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BookingPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BookingHistoryPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout showSidebar={false}>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout showSidebar={false}>
                <SignupPage />
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout showSidebar={false}>
                <NotFoundPage />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
