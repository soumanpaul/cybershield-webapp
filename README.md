# CyberShield Intelligence Console

A Next.js dashboard backed by PostgreSQL with real-time, refresh-free updates. Mobile clients write identity records to an API; PostgreSQL `LISTEN/NOTIFY` pushes each committed record through Server-Sent Events (SSE) to every open dashboard.

## Run locally

1. Start PostgreSQL:

   ```bash
   docker-compose up -d
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). The `captured_users` table and its index are created safely on the first request.
Five demo users are inserted when the table is empty. Set `SEED_DEMO_DATA=false` to disable this behavior; existing rows are never replaced.

Use the dashboard switch to move between the CyberShield hacker console and the clean **Captured Data** table. The selection is saved in the browser, and both modes receive the same live updates.

## Mobile ingestion API

`POST /api/mobile/users`

```bash
curl -X POST http://localhost:3000/api/mobile/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your-key-if-configured' \
  -d '{
    "externalId": "MOB-9031",
    "name": "Maya Chen",
    "email": "maya@example.com",
    "phone": "+1 555 0199",
    "ipAddress": "203.0.113.42",
    "device": "Pixel 9 / Android 16",
    "location": "Singapore",
    "status": "ACTIVE",
    "threatLevel": "medium"
  }'
```

Required fields are `name` and `email`. `threatLevel` accepts `low`, `medium`, `high`, or `critical`. If `MOBILE_API_KEY` is populated, the endpoint requires the matching bearer token.

## Dashboard APIs

- `GET /api/users?limit=200` fetches current records (maximum 500).
- `GET /api/users/stream` opens the SSE live-update stream.
- The dashboard refresh icon calls the fetch endpoint on demand.

## Production notes

- Use a managed PostgreSQL URL that supports persistent connections and `LISTEN/NOTIFY`.
- Run this application on a long-lived Node.js host for SSE. Some serverless platforms impose response-duration limits; on those platforms use a managed realtime transport instead.
- Set `MOBILE_API_KEY` in production and restrict `Access-Control-Allow-Origin` to your trusted origin if this endpoint is also called from a browser-based mobile client.



 Local URLs:

  - New Cyber Suraksha UX: http://localhost:3000 (http://localhost:3000)
  - Previous captured-data dashboard: http://localhost:3000/data-dashboard (http://localhost:3000/data-dashboard)
  - Existing full scam simulator: http://localhost:3000/scam-simulator (http://localhost:3000/scam-simulator)

