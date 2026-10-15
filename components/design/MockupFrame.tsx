import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Browser-window mockup frame (traffic lights + url + year) for project showcases. */
export function MockupFrame({
  url,
  year,
  className,
  children,
}: {
  url: string;
  year: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('border-2 border-black', className)}>
      <div className="flex items-center justify-between border-b-2 border-black bg-neutral-900 px-3 py-1.5 text-[11px] text-white">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[10px] text-neutral-400">{url}</span>
        <span>{year}</span>
      </div>
      {children}
    </div>
  );
}
