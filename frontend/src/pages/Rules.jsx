import React from "react";

export default function Rules() {
  return (
    <div className="bg-card p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hackathon Rules</h2>
      <ol className="list-decimal space-y-2 ml-5">
        <li>Teams must register before the deadline.</li>
        <li>Each team can have up to 4 members.</li>
        <li>Respect deadlines and submission formats.</li>
        <li>Judges' decision is final.</li>
        <li>Follow the provided themes and rules for the track.</li>
      </ol>
    </div>
  );
}
