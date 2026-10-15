import { SignJWT, jwtVerify } from 'jose';

/**
 * Admin session tokens (Phase 4).
 *
 * This module must stay edge-safe (jose only, no node deps) because
 * middleware.ts imports it. Cookie/next/headers helpers live in
 * lib/admin-session.ts.
 */

export const SESSION_COOKIE = 'admin_session';

/** 24h — sessions are re-issued on each login. */
export const SESSION_MAX_AGE = 60 * 60 * 24;

export type AdminSession = {
  /** Admin email (JWT `sub`). */
  sub: string;
  role: 'admin';
};

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== 'admin' || typeof payload.sub !== 'string') return null;
    return { sub: payload.sub, role: 'admin' };
  } catch {
    return null;
  }
}
