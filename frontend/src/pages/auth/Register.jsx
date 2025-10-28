import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "participant" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Registered — you can login now");
      nav("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full p-2 border rounded">
          <option value="participant">Participant</option>
          <option value="organizer">Organizer</option>
        </select>
        <button className="px-4 py-2 border rounded">Register</button>
      </form>
    </div>
  );
}
