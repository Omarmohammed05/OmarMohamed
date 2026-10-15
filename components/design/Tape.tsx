import { cn } from '@/lib/utils';

/** Semi-transparent scotch-tape strip. Position/rotation via className. */
export function Tape({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('scotch-tape absolute', className)} />;
}
