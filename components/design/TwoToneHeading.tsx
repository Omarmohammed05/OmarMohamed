import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ACCENTS = {
  red: 'text-brand-red',
  blue: 'text-brand-blue',
} as const;

type Props = {
  text: string;
  /** Word inside `text` rendered in the accent color (e.g. "ME" in "ABOUT ME"). */
  highlight?: string;
  accent?: keyof typeof ACCENTS;
  level?: 1 | 2 | 3 | 4;
  className?: string;
};

/** Giant display heading with one word in the accent color. */
export function TwoToneHeading({
  text,
  highlight,
  accent = 'red',
  level = 2,
  className,
}: Props) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

  let content: ReactNode = text;
  if (highlight) {
    const parts = text.split(highlight);
    if (parts.length > 1) {
      content = (
        <>
          {parts[0]}
          <span className={ACCENTS[accent]}>{highlight}</span>
          {parts.slice(1).join(highlight)}
        </>
      );
    }
  }

  return <Tag className={cn('font-display uppercase leading-none tracking-tight', className)}>{content}</Tag>;
}
