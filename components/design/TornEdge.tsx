import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type TornSide = 'top' | 'bottom' | 'both';

const SIDE_CLASSES: Record<TornSide, string> = {
  top: 'torn-top',
  bottom: 'torn-bottom',
  both: 'torn-strip-both',
};

/**
 * Jagged torn-paper edge wrapper. The clip-path classes are defined in
 * app/globals.css (design token: torn edges). Position/rotation via className.
 */
export function TornEdge({
  side = 'top',
  className,
  children,
}: {
  side?: TornSide;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn(SIDE_CLASSES[side], className)}>
      {children}
    </div>
  );
}
