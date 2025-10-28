import express from "express";
import { Team } from "../models/Team.js";
import { protect, organizerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const teams = await Team.find().sort({ score: -1 });
  res.json(teams);
});

router.post("/", protect, organizerOnly, async (req, res) => {
  const team = await Team.create(req.body);
  req.io.emit("teamsUpdated");
  res.json(team);
});

router.put("/:id", protect, organizerOnly, async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  req.io.emit("teamsUpdated");
  res.json(team);
});

export default router;
