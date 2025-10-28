import React, { useEffect, useState } from "react";
import api from "../services/api";
import AnnouncementsList from "../components/AnnouncementsList";
import { connectSocket } from "../services/socket";
import { useAuth } from "../contexts/AuthContext";

export default function Announcements() {
  const [items, setItems] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    api.get("/api/announcements").then((r) => setItems(r.data));
  }, []);

  useEffect(() => {
    const s = connectSocket(token);
    s.on("newAnnouncement", (ann) => setItems((p) => [ann, ...p]));
    return () => s.off("newAnnouncement");
  }, [token]);

  return <AnnouncementsList items={items} />;
}
