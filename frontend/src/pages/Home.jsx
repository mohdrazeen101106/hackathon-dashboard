import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Hackathon Dashboard</h1>
      <p className="mb-6">Real-time team rankings, announcements, and admin controls.</p>
      <div className="space-x-3">
        <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
        <Link to="/register" className="px-4 py-2 border rounded">Register</Link>
        <Link to="/rules" className="px-4 py-2 border rounded">Rules</Link>
      </div>
    </div>
  );
}
