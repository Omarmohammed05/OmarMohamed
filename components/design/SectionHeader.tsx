import { cn } from '@/lib/utils';

/**
 * Tiny "OMAR / 2026" style section bar: left / middle / right meta labels.
 * Middle and right labels are progressively hidden on small screens.
 */
export function SectionHeader({
  left,
  middle,
  right,
  dark = true,
  className,
}: {
  left: string;
  middle?: string;
  right?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-12 flex items-center justify-between gap-4 border-b pb-3 text-xs font-bold uppercase tracking-widest',
        dark ? 'border-neutral-800 text-neutral-400' : 'border-black text-brand-black',
        className,
      )}
    >
      <span>{left}</span>
      {middle ? <span className="hidden sm:inline">{middle}</span> : null}
      {right ? <span className="hidden md:inline">{right}</span> : null}
    </div>
  );
}
