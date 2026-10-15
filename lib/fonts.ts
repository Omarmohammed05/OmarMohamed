import { Anton, Montserrat, Permanent_Marker } from 'next/font/google';

/** Headlines — Anton (caps, condensed). */
export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

/** Body — Montserrat. */
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

/** Sticker labels — Permanent Marker. */
export const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marker',
});
