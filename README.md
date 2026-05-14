# Inventory App

Monorepo-style layout: **client** (React + Vite) and **server** (Node + Express + Mongoose).

## Quick start

### Database (Docker)

```bash
docker compose up -d
```

### Server

```bash
cd server
npm install
npm run dev
```

Edit `server/.env` for MongoDB URI and JWT secrets before running.

### Client

```bash
cd client
npm install
npm run dev
```

Edit `client/.env` if the API base URL differs from `http://localhost:5000/api`.

## Structure

See repository tree: `client/` for the Vite SPA, `server/` for the API, and `docker-compose.yml` for MongoDB + Mongo Express.
