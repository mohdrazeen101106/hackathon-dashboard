import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export const Announcement = mongoose.model("Announcement", announcementSchema);
