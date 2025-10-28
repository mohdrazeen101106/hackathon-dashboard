import express from "express";
import { Announcement } from "../models/Announcement.js";
import { protect, organizerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const announcements = await Announcement.find().sort({ timestamp: -1 });
  res.json(announcements);
});

router.post("/", protect, organizerOnly, async (req, res) => {
  const ann = await Announcement.create(req.body);
  req.io.emit("newAnnouncement", ann);
  res.json(ann);
});

export default router;
