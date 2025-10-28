import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  domain: { type: String, enum: ["Web", "ML", "Design"], default: "Web" },
  score: { type: Number, default: 0 }
});

export const Team = mongoose.model("Team", teamSchema);
