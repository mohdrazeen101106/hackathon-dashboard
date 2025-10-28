import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Announcements from "./pages/Announcements";
import Rules from "./pages/Rules";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Toaster position="top-right" />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
