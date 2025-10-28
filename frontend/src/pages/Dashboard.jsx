import React, { useEffect, useState } from "react";
import api from "../services/api";
import Leaderboard from "../components/Leaderboard";
import { connectSocket, getSocket } from "../services/socket";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/api/teams");
      setTeams(res.data);
      const a = await api.get("/api/announcements");
      setAnnouncements(a.data);
    };
    load();
  }, []);

  useEffect(() => {
    // connect socket once
    const s = connectSocket(token);
    s.on("connect", () => console.log("socket connected"));
    s.on("teamsUpdated", async () => {
      const res = await api.get("/api/teams");
      setTeams(res.data);
    });
    s.on("newAnnouncement", (ann) => {
      setAnnouncements((prev) => [ann, ...prev]);
      toast.success("New announcement: " + ann.message);
    });
    return () => {
      s.off("teamsUpdated");
      s.off("newAnnouncement");
    };
  }, [token]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Leaderboard teams={teams} />
      </div>
      <div>
        <div className="space-y-4">
          <div className="bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Recent Announcements</h3>
            {announcements.slice(0, 5).map((a) => (
              <div key={a._id} className="border rounded p-2 mb-2">
                <div className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
                <div>{a.message}</div>
              </div>
            ))}
          </div>
          <div className="bg-card p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm">Visit the Admin panel to update scores and post announcements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
