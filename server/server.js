import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

dotenv.config();

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://hackathon-dashboard-eta.vercel.app" // for frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);


const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST", "PUT"] }
});

// attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/announcements", announcementRoutes);

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
