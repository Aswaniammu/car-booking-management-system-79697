import React, { useState, useEffect } from "react";

/** Accent color inline style for the toggle */
const toggleStyle = {
  backgroundColor: "var(--accent-color, #ffd600)",
  border: "none",
  borderRadius: "8px",
  padding: "7px 17px",
  marginLeft: "1rem",
  color: "#282c34",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background 0.3s, color 0.3s",
};

function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <button
      style={toggleStyle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
export default ThemeToggle;
