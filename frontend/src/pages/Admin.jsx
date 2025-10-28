import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Admin() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({ name: "", domain: "Web" });
  const [ann, setAnn] = useState("");

  const load = async () => {
    const r = await api.get("/api/teams");
    setTeams(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addTeam = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/teams", form);
      toast.success("Team added");
      setForm({ name: "", domain: "Web" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const updateScore = async (id, delta) => {
    const team = teams.find((t) => t._id === id);
    const newScore = (team.score || 0) + delta;
    try {
      await api.put(`/api/teams/${id}`, { score: newScore });
      toast.success("Score updated");
      load();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const postAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/announcements", { message: ann });
      setAnn("");
      toast.success("Announcement posted");
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Team</h3>
        <form onSubmit={addTeam} className="flex gap-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Team name" className="p-2 border rounded flex-1" />
          <select value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className="p-2 border rounded">
            <option>Web</option>
            <option>ML</option>
            <option>Design</option>
          </select>
          <button className="px-3 py-2 border rounded">Add</button>
        </form>
      </div>

      <div className="bg-card p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Teams & Scores</h3>
        <div className="space-y-2">
          {teams.map((t) => (
            <div key={t._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{t.name} <span className="text-xs text-gray-500">({t.domain})</span></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="font-bold w-12 text-center">{t.score}</div>
                <button onClick={() => updateScore(t._id, 1)} className="px-2 py-1 border rounded">+1</button>
                <button onClick={() => updateScore(t._id, -1)} className="px-2 py-1 border rounded">-1</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Post Announcement</h3>
        <form onSubmit={postAnnouncement} className="space-y-2">
          <textarea value={ann} onChange={(e) => setAnn(e.target.value)} rows={3} className="w-full p-2 border rounded" placeholder="Message"></textarea>
          <button className="px-4 py-2 border rounded">Post</button>
        </form>
      </div>
    </div>
  );
}
