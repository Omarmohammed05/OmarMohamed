import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { anton, marker, montserrat } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'OMAR — Web Developer & Software Engineer',
    template: '%s — OMAR',
  },
  description:
    'Portfolio of Omar, a web developer & software engineer crafting loud, fast & bulletproof digital systems.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn('scroll-smooth', anton.variable, montserrat.variable, marker.variable)}
    >
      <body className="overflow-x-hidden bg-brand-black font-sans text-brand-paper antialiased selection:bg-brand-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
