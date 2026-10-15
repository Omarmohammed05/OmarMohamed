import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken, type AdminSession } from '@/lib/auth';

/** Read + verify the admin session from the httpOnly cookie (server only). */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
