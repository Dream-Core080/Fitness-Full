# Cressey Fitness API

Express- and MongoDB-backed REST API that powers the Cressey Fitness products. It exposes resources for users, tags, collections, categories, exercises, quizzes, and intro content, with Firebase-authenticated access for secured endpoints.

## Tech Stack

- Node.js 18+
- Express 4
- MongoDB with Mongoose ODM
- Firebase Admin SDK (service account)
- Socket.IO for realtime features
- Node-cron for scheduled jobs

## Prerequisites

- **Node.js** v18 or newer (needed for `sharp` and Firebase Admin SDK)
- **npm** v9+ (ships with Node 18)
- **MongoDB** running locally or remotely. The default connection string in `config/db.js` expects a local instance on `mongodb://localhost:27017/cressey-fitness`.
- **Firebase service account** JSON with access to your project (used to verify ID tokens). Place the file at `backend/permissions.json` or point the code to your own path.

## Environment Variables

Create a `.env` file in `backend/` to override defaults. Supported values:

```
PORT=5004               # HTTP port (defaults to 5004)
NODE_ENV=development    # Enables additional CORS origins
FIREBASE_DB_URL=...     # Optional: override the databaseURL used by Firebase Admin
```

> Note: Database credentials are currently pulled from `config/db.js`. Update that file or extend it to read from `process.env.MONGO_URI` if you prefer configuration via environment variables.

## Installation

```bash
cd backend
npm install
```

If you use a private Firebase service account, replace `permissions.json` with your own version (and be sure to keep it out of source control).

## Local Development

```bash
cd backend
npm run dev
```

The server starts on `http://localhost:5004` by default. When `NODE_ENV=development`, CORS requests from `http://localhost:3000` are automatically allowed for the Next.js frontend.

## Project Structure

```
backend/
├── config/            # Database configuration
├── controllers/       # Route handlers for domain resources
├── middleware/        # Authentication middleware
├── models/            # Mongoose schemas
├── routes/            # Express routers
├── utils/             # Shared utilities and cron jobs
└── server.js          # Application entry point
```

## Scripts

- `npm run dev` – Starts the API with `nodemon`
- `npm test` – Placeholder (no automated tests yet)

## Scheduled Jobs

Any cron-based tasks live in `utils/cron/`. For example, `generateQuestionOTD.js` can be wired into an external scheduler or required from `server.js` depending on deployment needs.

## Deployment Notes

- Heroku-style deployments can use the provided `Procfile`.
- Ensure `permissions.json` and any `.env` values are supplied through your hosting platform's secrets management.
- Configure your firewall or hosting environment so the frontend (`REACT_APP_API_URL`) points to the deployed base URL of this API.


