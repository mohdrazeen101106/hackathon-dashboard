import React, { useEffect, useState } from "react";
import api from "../services/api";
import Leaderboard from "../components/Leaderboard";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("/api/teams").then((r) => setTeams(r.data));
  }, []);

  const filtered = teams.filter((t) => (filter ? t.domain === filter : true));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Teams</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All Domains</option>
          <option value="Web">Web</option>
          <option value="ML">ML</option>
          <option value="Design">Design</option>
        </select>
      </div>
      <Leaderboard teams={filtered} />
    </div>
  );
}
