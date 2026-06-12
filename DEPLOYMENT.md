# Deployment Guide

## Backend — Railway (or Render)

1. Create a new project on [Railway](https://railway.app) or [Render](https://render.com)
2. Connect this GitHub repo
3. Set the following environment variables:
   - `DATABASE_URL` — your MySQL connection string
   - `PORT` — set to `5000` (or leave unset; server.js reads process.env.PORT)
4. Set the start command to: `node server.js`
5. After deploy, copy the public URL (e.g. `https://ikonex-academy.up.railway.app`)

### Database
- Run migrations after deploy: `npx prisma migrate deploy`
- Or push schema directly: `npx prisma db push`

## Frontend — Vercel

1. Import this repo on [Vercel](https://vercel.com)
2. Set the following environment variable in Vercel project settings:
   - `VITE_API_URL` — the backend URL from Railway/Render (e.g. `https://ikonex-academy.up.railway.app`)
3. Vercel will auto-detect `vercel.json` and build with `npx vite build`

## Local Development

```env
# .env (already gitignored)
DATABASE_URL="mysql://user:password@localhost:3306/ikonex"
```

Start backend: `npm run dev`  
Start frontend: `npx vite`
