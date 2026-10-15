import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createMessage } from '@/lib/db';

/** POST /api/contact — validates with zod and stores the message in Neon. */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  try {
    await createMessage(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      for (const issue of error.issues) {
        const key = typeof issue.path[0] === 'string' ? issue.path[0] : 'form';
        errors[key] = [...(errors[key] ?? []), issue.message];
      }
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    console.error('[api/contact] failed:', error);
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
