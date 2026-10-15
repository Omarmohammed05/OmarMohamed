import type { Project } from '@/lib/db';
import { cn } from '@/lib/utils';

/** Strips a URL down to its hostname for the mockup address bar. */
export function projectHost(project: Project): string {
  if (!project.liveUrl) return 'OMAR.DEV';
  return project.liveUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toUpperCase();
}

const VARIANTS = [
  {
    canvas: 'bg-neutral-950 text-white',
    accent: 'text-brand-blue',
    pill: 'bg-white text-black',
    box: 'border-white/20 bg-neutral-900/60',
    meta: 'text-neutral-400',
    footer: 'border-neutral-800',
  },
  {
    canvas: 'bg-brand-blue text-white',
    accent: 'text-white',
    pill: 'bg-black text-white',
    box: 'border-white bg-black',
    meta: 'text-white/80',
    footer: 'border-white/20',
  },
  {
    canvas: 'bg-brand-red text-white',
    accent: 'text-amber-300',
    pill: 'bg-black text-white',
    box: 'border-white/30 bg-neutral-950',
    meta: 'text-neutral-200',
    footer: 'border-white/30',
  },
] as const;

/**
 * Zine-style browser-canvas mockup generated from project data —
 * the default showcase visual for DB-driven project cards.
 */
export function ProjectCanvas({
  project,
  variant = 0,
  className,
}: {
  project: Project;
  variant?: number;
  className?: string;
}) {
  const v = VARIANTS[variant % VARIANTS.length];
  return (
    <div
      className={cn(
        'relative flex min-h-[220px] flex-col justify-between p-4',
        v.canvas,
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={cn('font-display text-2xl leading-tight tracking-wider', v.accent)}>
          {projectHost(project)}
        </span>
        <span className={cn('px-2 py-0.5 text-[9px] font-bold uppercase', v.pill)}>
          {project.tag || 'PROJECT'}
        </span>
      </div>

      <div className={cn('my-3 border p-3', v.box)}>
        <p className="font-display text-xl leading-tight">{project.title.toUpperCase()}</p>
        <p className={cn('mt-1 text-[10px] uppercase tracking-wider', v.meta)}>
          {project.tagline || project.description.slice(0, 60)}
        </p>
      </div>

      <div
        className={cn(
          'flex items-center justify-between gap-2 border-t pt-2 text-[10px] font-bold uppercase',
          v.footer,
          v.meta,
        )}
      >
        <span>{project.tech.slice(0, 3).join(' / ') || 'CUSTOM BUILD'}</span>
        <span>
          {project.liveUrl ? 'LIVE' : 'ARCHIVED'}
          {project.year ? ` // ${project.year}` : ''}
        </span>
      </div>
    </div>
  );
}
