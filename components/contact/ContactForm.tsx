'use client';

import { useState } from 'react';

type SubmitState =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

const LABEL_CLASSES =
  'mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-brand-black';
const FIELD_CLASSES =
  'w-full border-2 border-black bg-white px-3 py-2.5 text-sm font-semibold text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue';

/** Neo-brutalist contact form posting to /api/contact (Neon-backed). */
export function ContactForm() {
  const [submit, setSubmit] = useState<SubmitState>({ state: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmit({ state: 'submitting' });

    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setSubmit({ state: 'success' });
        return;
      }

      const body: unknown = await response.json().catch(() => null);
      const errors = (body as { errors?: Record<string, string[]> } | null)?.errors;
      const message = errors
        ? Object.entries(errors)
            .map(([field, messages]) => `${field.toUpperCase()}: ${messages.join(' ')}`)
            .join(' // ')
        : 'TRANSMISSION FAILED — RETRY OR EMAIL DIRECTLY.';
      setSubmit({ state: 'error', message });
    } catch {
      setSubmit({ state: 'error', message: 'NETWORK ERROR — CHECK CONNECTION AND RETRY.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className={LABEL_CLASSES}>
          {'// YOUR NAME'}
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          placeholder="JANE CODESLINGER"
          className={FIELD_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASSES}>
          {'// EMAIL'}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="JANE@STUDIO.DEV"
          className={FIELD_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASSES}>
          {'// THE BRIEF'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="WHAT ARE WE BUILDING?"
          className={FIELD_CLASSES}
        />
      </div>

      <button
        type="submit"
        disabled={submit.state === 'submitting'}
        className="mt-2 border-2 border-black bg-brand-blue px-6 py-3 font-display text-xl uppercase tracking-wide text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submit.state === 'submitting' ? 'TRANSMITTING…' : 'SEND TRANSMISSION →'}
      </button>

      {submit.state === 'success' ? (
        <p
          role="status"
          className="border-2 border-black bg-white p-3 text-xs font-bold uppercase tracking-wider text-brand-black shadow-brutal"
        >
          ✓ SIGNAL RECEIVED — RESPONSE WITHIN 24 HOURS.
        </p>
      ) : null}

      {submit.state === 'error' ? (
        <p
          role="alert"
          className="border-2 border-brand-red bg-white p-3 text-xs font-bold uppercase tracking-wider text-brand-black"
        >
          ✕ {submit.message}
        </p>
      ) : null}
    </form>
  );
}
