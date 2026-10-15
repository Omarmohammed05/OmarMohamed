import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tape } from './Tape';

/** Marker-font sticker label with a tape strip (e.g. the hero role label). */
export function StickerLabel({
  children,
  className,
  tapeClassName,
}: {
  children: ReactNode;
  className?: string;
  tapeClassName?: string;
}) {
  return (
    <span className={cn('inline-block -rotate-2', className)}>
      <span className="relative inline-block border-2 border-black bg-white px-4 py-1 font-hand text-xl font-bold text-brand-black shadow-brutal md:text-2xl">
        {children}
        <Tape className={cn('-top-3 left-6 h-5 w-12 -rotate-12', tapeClassName)} />
      </span>
    </span>
  );
}
