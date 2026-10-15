import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

/** POST /api/admin/login — issues a signed session cookie on valid credentials. */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const parsed = credentialsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'INVALID_CREDENTIALS' }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash) {
    console.error('[api/admin/login] ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not configured');
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }

  const { email, password } = parsed.data;
  // Always run the bcrypt compare so a wrong email does not leak a timing signal.
  const passwordOk = await bcrypt.compare(password, adminHash);
  if (email !== adminEmail || !passwordOk) {
    return NextResponse.json({ ok: false, error: 'INVALID_CREDENTIALS' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
