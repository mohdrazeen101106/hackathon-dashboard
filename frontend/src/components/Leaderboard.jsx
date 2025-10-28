import React from "react";

export default function Leaderboard({ teams }) {
  return (
    <div className="bg-card rounded p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <div className="space-y-2">
        {teams.map((t, i) => (
          <div key={t._id || t.name} className="flex items-center justify-between p-2 rounded border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-slate-200">{i + 1}</div>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs">{t.domain}</div>
              </div>
            </div>
            <div className="text-lg font-bold">{t.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
