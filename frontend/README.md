# Cressey Fitness Frontend

Next.js 14 application that delivers the member-facing experience for Cressey Fitness. It consumes the REST API served by the backend service and integrates Firebase Authentication for secure access.

## Tech Stack

- Next.js 14 (App Router)
- React 18 with TypeScript
- Tailwind CSS + custom SCSS modules
- Firebase Client SDK
- React Query for data fetching and caching

## Prerequisites

- **Node.js** v18 or newer
- **npm** v9+
- A running instance of the Cressey Fitness backend API
- Firebase web app credentials (for authentication)

## Environment Variables

Create `frontend/.env.local` with the following keys before running the app:

```
REACT_APP_API_URL=http://localhost:5004/api    # Base URL of the backend API
```

Restart the dev server after changing environment variables.

## Installation

```bash
cd frontend
npm install
```

## Local Development

```bash
cd frontend
npm run dev
```

The dev server runs on [http://localhost:5000](http://localhost:5000). The proxy/CORS configuration in the backend already trusts this origin when `NODE_ENV=development`.

## Available Scripts

- `npm run dev` – Start Next.js in development mode on port 5000
- `npm run build` – Build the production bundle
- `npm run start` – Serve the production build
- `npm run lint` – Run Next.js ESLint rules

## Project Structure

```
frontend/
├── app/             # App Router routes, layouts, and loading states
├── components/      # Shared UI components
├── config/          # Firebase config wrapper
├── utils/           # API client, helpers, providers
├── stores/          # Zustand stores for client-side state
├── styles/          # Global and component-level styles
└── public/          # Static assets
```

## Connecting to the Backend

- Make sure the backend is running on the URL referenced by `REACT_APP_API_URL`.
- The frontend sends the Firebase ID token in the `FIREBASE_AUTH_TOKEN` header when available. Ensure the backend Firebase Admin credentials match the same project used here.
- If you deploy to another domain, update both the backend CORS configuration and the environment variables for the deployed frontend.

## Deployment Notes

- Set the same environment variables (`REACT_APP_API_URL`, `FIREBASE_API`) in your hosting environment (Vercel, Netlify, etc.).
- Run `npm run build` as part of your CI/CD pipeline before starting the production server with `npm run start`.
- Configure your CDN to cache static assets in `public/` and Next.js generated assets under `.next/`.
