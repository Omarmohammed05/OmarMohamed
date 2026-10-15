import type { ReactNode } from 'react';
import { MockupFrame } from '@/components/design/MockupFrame';
import { Tape } from '@/components/design/Tape';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  tag: string;
  description: string;
  tech: string;
  url: string;
  year: string;
  className?: string;
  tapeClassName?: string;
  /** Unique mockup canvas rendered inside the browser frame. */
  canvas: ReactNode;
};

/** Taped browser-mockup project card (featured work collage). */
export function ProjectCard({
  title,
  tag,
  description,
  tech,
  url,
  year,
  className,
  tapeClassName,
  canvas,
}: Props) {
  return (
    <article
      className={cn(
        'relative border-4 border-black p-4 text-brand-black shadow-brutal transition-transform duration-300 hover:rotate-0',
        className,
      )}
    >
      <Tape className={tapeClassName} />
      <MockupFrame url={url} year={year}>{canvas}</MockupFrame>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl uppercase tracking-tight">{title}</h3>
          <span className="text-xs font-bold text-brand-red">{tag}</span>
        </div>
        <p className="text-xs text-neutral-700">{description}</p>
        <div className="flex items-center justify-between border-t border-black/10 pt-2 text-xs font-bold">
          <span className="bg-black px-2 py-0.5 text-white">{tech}</span>
          <a href="#contact" className="underline transition-colors hover:text-brand-red">
            VIEW CASE →
          </a>
        </div>
      </div>
    </article>
  );
}
