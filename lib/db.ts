import { Client, Pool, type PoolClient, type QueryResultRow } from "pg";
import type { UserInput, UserRecord } from "@/lib/types";

const connectionString = process.env.DATABASE_URL;
const ssl = connectionString?.includes(".supabase.co")
  ? { rejectUnauthorized: false }
  : undefined;

if (!connectionString) {
  console.warn("DATABASE_URL is not configured. Database routes will return an error.");
}

const globalForDb = globalThis as unknown as { cyberShieldPool?: Pool };

export const pool =
  globalForDb.cyberShieldPool ??
  new Pool({
    connectionString,
    ssl,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

if (process.env.NODE_ENV !== "production") globalForDb.cyberShieldPool = pool;

export function createListenerClient() {
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  return new Client({ connectionString, ssl });
}

let schemaPromise: Promise<void> | null = null;

export function ensureSchema() {
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  schemaPromise ??= (async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS captured_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        external_id TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        ip_address INET,
        device TEXT,
        location TEXT,
        status TEXT NOT NULL DEFAULT 'ACTIVE',
        threat_level TEXT NOT NULL DEFAULT 'low'
          CHECK (threat_level IN ('low', 'medium', 'high', 'critical')),
        last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS captured_users_created_at_idx
        ON captured_users (created_at DESC);
    `);

    if (process.env.SEED_DEMO_DATA !== "false") {
      await pool.query(`
        INSERT INTO captured_users
          (external_id, name, email, phone, ip_address, device, location, status, threat_level, last_seen, created_at)
        SELECT * FROM (VALUES
          ('DEMO-1001', 'Aarav Sharma', 'aarav.sharma@example.com', '+91 98765 43210', '203.0.113.12'::inet, 'Pixel 9 / Android 16', 'Mumbai, India', 'ACTIVE', 'low', NOW() - INTERVAL '2 minutes', NOW() - INTERVAL '2 minutes'),
          ('DEMO-1002', 'Maya Chen', 'maya.chen@example.com', '+65 8123 4567', '198.51.100.28'::inet, 'iPhone 16 Pro / iOS 19', 'Singapore', 'ACTIVE', 'medium', NOW() - INTERVAL '18 minutes', NOW() - INTERVAL '18 minutes'),
          ('DEMO-1003', 'Noah Williams', 'noah.williams@example.com', '+44 7700 900123', '192.0.2.45'::inet, 'Galaxy S25 / Android 16', 'London, UK', 'INACTIVE', 'high', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),
          ('DEMO-1004', 'Sofia Martinez', 'sofia.martinez@example.com', '+34 612 345 678', '203.0.113.88'::inet, 'OnePlus 13 / Android 15', 'Madrid, Spain', 'ACTIVE', 'low', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours'),
          ('DEMO-1005', 'Liam Johnson', 'liam.johnson@example.com', '+1 415 555 0142', '198.51.100.76'::inet, 'iPhone 15 / iOS 18', 'San Francisco, USA', 'ACTIVE', 'critical', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day')
        ) AS demo(external_id, name, email, phone, ip_address, device, location, status, threat_level, last_seen, created_at)
        WHERE NOT EXISTS (SELECT 1 FROM captured_users);
      `);
    }
  })();
  return schemaPromise;
}

type UserRow = QueryResultRow & {
  id: string;
  external_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  ip_address: string | null;
  device: string | null;
  location: string | null;
  status: string;
  threat_level: UserRecord["threatLevel"];
  last_seen: Date;
  created_at: Date;
};

export function toUser(row: UserRow): UserRecord {
  return {
    id: row.id,
    externalId: row.external_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    ipAddress: row.ip_address,
    device: row.device,
    location: row.location,
    status: row.status,
    threatLevel: row.threat_level,
    lastSeen: row.last_seen.toISOString(),
    createdAt: row.created_at.toISOString(),
  };
}

export async function listUsers(limit = 100): Promise<UserRecord[]> {
  await ensureSchema();
  const result = await pool.query<UserRow>(
    "SELECT * FROM captured_users ORDER BY created_at DESC LIMIT $1",
    [limit],
  );
  return result.rows.map(toUser);
}

export async function insertUser(input: UserInput): Promise<UserRecord> {
  await ensureSchema();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<UserRow>(
      `INSERT INTO captured_users
        (external_id, name, email, phone, ip_address, device, location, status, threat_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        input.externalId || null,
        input.name,
        input.email,
        input.phone || null,
        input.ipAddress || null,
        input.device || null,
        input.location || null,
        input.status || "ACTIVE",
        input.threatLevel ?? "low",
      ],
    );
    const user = toUser(result.rows[0]);
    await notifyUser(client, user);
    await client.query("COMMIT");
    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function notifyUser(client: PoolClient, user: UserRecord) {
  await client.query("SELECT pg_notify('cybershield_users', $1)", [JSON.stringify(user)]);
}
