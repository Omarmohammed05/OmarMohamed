'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  /** Path to land on after login (validated server-side before redirect). */
  next: string;
};

export function LoginForm({ next }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError('ACCESS DENIED — WRONG EMAIL OR PASSWORD.');
        setPassword('');
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError('TRANSMISSION FAILED — TRY AGAIN.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
          EMAIL
        </span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="border-4 border-black bg-white px-4 py-3 font-body text-base text-brand-black shadow-brutal outline-none focus:bg-brand-paper focus:ring-4 focus:ring-brand-blue/40"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
          ACCESS CODE
        </span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="border-4 border-black bg-white px-4 py-3 font-body text-base text-brand-black shadow-brutal outline-none focus:bg-brand-paper focus:ring-4 focus:ring-brand-blue/40"
        />
      </label>

      {error && (
        <p
          role="alert"
          className="-rotate-1 border-2 border-black bg-brand-red px-3 py-2 font-hand text-lg font-bold text-white shadow-brutal"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 border-4 border-black bg-brand-blue px-6 py-4 font-display text-xl uppercase tracking-tight text-white shadow-brutal-lg transition-colors hover:bg-brand-red disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'VERIFYING…' : 'ENTER THE BACKSTAGE →'}
      </button>
    </form>
  );
}
