'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '@/lib/auth';

/** Clears the admin session cookie and returns to the login screen. */
export async function logout(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/admin/login');
}
