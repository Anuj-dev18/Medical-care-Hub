# MediCare Hub 🏥

A full-stack medical appointment and health-record demo built with React, JavaScript, CSS, Node.js, Express and MongoDB.

## Features
- Modern responsive medical dashboard
- Doctor directory with search/filter
- Appointment booking form
- Health tips / wellness cards
- Demo symptom checker with a clear non-diagnostic disclaimer
- MongoDB-ready REST API for appointments
- Clean frontend/backend separation

## Tech Stack
Frontend: React + Vite + CSS + JavaScript
Backend: Node.js + Express + Mongoose
Database: MongoDB Atlas / local MongoDB

## Run

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## GitHub
Do not upload `.env`. A `.gitignore` is included.
