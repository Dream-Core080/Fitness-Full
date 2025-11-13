# Fitness-Full Platform Snapshot

## About Project
This repository contains the working copy of a full-stack fitness platform inspired by [Eric Cressey Performance](https://ericcressey.com/). The solution is split into a backend API (Node.js/Express + MongoDB + Firebase Admin) and a Next.js 14 frontend that delivers the member experience. Firebase authentication is used end-to-end, and the backend now bootstraps mock content automatically to jump start local development.

## Project Structure
```
.
├── backend/      # Express API, MongoDB models, Firebase admin, seed scripts
└── frontend/     # Next.js 14 App Router client, Tailwind styling, Firebase auth
```

### Backend Highlights
- `config/` – database connection helpers (`connectDB`).
- `controllers/`, `routes/`, `models/` – domain logic and REST endpoints (exercises, tags, equipment, quizzes, intros).
- `middleware/` – Firebase token verification.
- `utils/seed.js` – mock data seeding (categories, collections, tags, equipment, quizzes, intros, exercises).

### Frontend Highlights
- `app/` routes are protected and consume the backend API through `utils/api.ts`.
- `styles/` and Tailwind pipeline power the UI, with static media under `public/`.

## Running Steps
1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Configure secrets**
   - Copy `backend/.env.example` to `.env` and set ports/keys as needed.
   - Provide `backend/permissions.json` with a Firebase service account.
   - Create `frontend/.env.local` with `REACT_APP_API_URL` pointing to the backend.
3. **Start services**
   ```bash
   # In separate terminals
   cd backend && npm run dev      # seeds mock data automatically on first boot
   cd frontend && npm run dev     # launches Next.js on port 5000 by default
   ```
   MongoDB should be running locally at `mongodb://localhost:27017/cressey-fitness`.

## Assessment Task
- Expand the dataset and enhance the seed logic.
- Improve the carousel UI on the frontend (add auto-scroll and loop functionality).


