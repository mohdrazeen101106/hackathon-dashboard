import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-lg">Hackathon Dashboard</Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-sm">Dashboard</Link>
              <Link to="/teams" className="text-sm">Teams</Link>
              <Link to="/announcements" className="text-sm">Announcements</Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggle} className="px-3 py-1 rounded border">{dark ? "Light" : "Dark"}</button>
          {user ? (
            <>
              {user.role === "organizer" && <Link to="/admin" className="px-3 py-1 border rounded text-sm">Admin</Link>}
              <button onClick={onLogout} className="px-3 py-1 rounded border text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded border text-sm">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded border text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
