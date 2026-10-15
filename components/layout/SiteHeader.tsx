'use client';

import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/nav';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-neutral-800 bg-brand-black/95 px-4 py-3 text-xs uppercase tracking-widest backdrop-blur-sm md:px-6 md:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rotate-45 bg-brand-red" />
          <span className="text-sm font-bold tracking-wider text-white">OMAR // DEV</span>
          <span className="hidden border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-400 md:inline-block">
            VER: 2026.4.1
          </span>
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-xs font-semibold tracking-wider text-neutral-300 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-brand-red">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-[11px] text-neutral-400 sm:inline-flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            AVAILABLE FOR HIRE
          </span>
          <a
            href="#contact"
            className="border border-black bg-brand-blue px-3 py-1.5 font-display text-sm uppercase tracking-wide text-white shadow-brutal transition duration-200 hover:bg-white hover:text-brand-black md:px-4"
          >
            LET&apos;S TALK
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center border-2 border-neutral-700 text-white md:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="font-display text-lg leading-none">
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="mt-3 flex flex-col gap-1 border-t border-neutral-800 pt-3 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-2 py-2 text-sm font-semibold tracking-wider text-neutral-200 transition-colors hover:text-brand-red"
            >
              {item.label}
            </a>
          ))}
          <span className="flex items-center gap-2 px-2 py-2 text-[11px] text-neutral-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            AVAILABLE FOR HIRE
          </span>
        </nav>
      ) : null}
    </header>
  );
}
