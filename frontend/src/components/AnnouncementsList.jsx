import React from "react";

export default function AnnouncementsList({ items }) {
  return (
    <div className="bg-card rounded p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Announcements</h2>
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a._id || a.timestamp} className="border rounded p-3">
            <div className="text-sm text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
            <div className="mt-1">{a.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
