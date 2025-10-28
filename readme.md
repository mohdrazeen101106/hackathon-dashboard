# Hackathon Dashboard

A real-time **Hackathon Event Dashboard** built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS.  
The platform provides **live leaderboard updates, team management, announcements, and admin controls** — all in a fully responsive and modern UI.

---

## Features

### Authentication
- **Organizer and Participant** roles
- JWT-based login and registration
- Protected routes for admin actions

### Dashboard
- Displays real-time **leaderboard** of teams
- Filter teams by domain: `Web`, `ML`, `Design`
- Auto-updates without page reload using WebSocket or Firebase realtime events

### Announcements
- Organizers can **post live announcements**
- Participants receive them instantly (live notifications)

### Admin Panel
- Organizer-only page to:
  - Update team scores
  - Add new announcements
  - Manage event data

### Theme Customization
- Light/Dark mode toggle
- Dynamic color palette support via Tailwind

### Responsive Design
- Mobile-first layout
- Collapsible filters and menus for smaller screens

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite) + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas |
| **Realtime** | WebSocket / Firebase Realtime DB |
| **Authentication** | JWT + bcrypt |
| **Styling** | Tailwind CSS (customized theme) |
| **Deployment** | Vercel (frontend) + Render (backend) |