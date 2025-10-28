import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <div className="flex justify-between items-center">
          <button className="px-4 py-2 border rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
