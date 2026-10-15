import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

/**
 * Shared pg pool. Uses the pooled Neon connection (`DATABASE_URL`, the
 * `-pooler` host) which is the right one for normal app query traffic.
 * Kept on globalThis so hot reloads in dev reuse one pool.
 */
export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set — run "neon deploy" (writes .env.local) or set it in your environment.',
    );
  }
  globalThis.__pgPool ??= new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });
  return globalThis.__pgPool;
}
