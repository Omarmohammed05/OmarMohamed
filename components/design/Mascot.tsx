import { cn } from '@/lib/utils';

/**
 * Vintage rubber-hose cartoon mascot head sticker (SVG, no external asset).
 * Optional speech pip.
 */
export function Mascot({
  className,
  speech,
}: {
  className?: string;
  speech?: string;
}) {
  // Default to relative for the speech-pip anchor, but let callers override
  // the position (absolute/fixed/sticky) — Tailwind emits .relative after
  // .absolute, so a forced 'relative' would silently win.
  const isPositioned =
    typeof className === 'string' &&
    /(?:^|\s)(?:absolute|fixed|sticky)(?:\s|$)/.test(className);

  return (
    <div className={cn(!isPositioned && 'relative', className)}>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full drop-shadow-[0_8px_0_rgba(0,0,0,1)]"
        aria-hidden="true"
      >
        {/* Ears */}
        <circle cx="28" cy="56" r="14" fill="#000" />
        <circle cx="92" cy="56" r="14" fill="#000" />
        {/* Face base */}
        <circle cx="60" cy="62" r="38" fill="#FFF" stroke="#000" strokeWidth="5" />
        {/* Hair puffs */}
        <path
          d="M 28 42 C 22 24, 42 16, 52 28 C 58 14, 76 16, 78 28 C 88 18, 98 28, 92 44 Z"
          fill="#000"
          stroke="#000"
          strokeWidth="2"
        />
        {/* Eyes */}
        <ellipse cx="46" cy="52" rx="7" ry="11" fill="#000" />
        <ellipse cx="74" cy="52" rx="7" ry="11" fill="#000" />
        <polygon points="46,52 53,48 53,56" fill="#FFF" />
        <polygon points="74,52 81,48 81,56" fill="#FFF" />
        {/* Nose */}
        <ellipse cx="60" cy="63" rx="4.5" ry="3.5" fill="#000" />
        {/* Pie-toothed grin */}
        <path d="M 36 68 Q 60 96 84 68 Z" fill="#FFF" stroke="#000" strokeWidth="4.5" />
        <line x1="48" y1="74" x2="48" y2="84" stroke="#000" strokeWidth="3" />
        <line x1="60" y1="76" x2="60" y2="86" stroke="#000" strokeWidth="3" />
        <line x1="72" y1="74" x2="72" y2="84" stroke="#000" strokeWidth="3" />
        {/* Rosy cheeks */}
        <ellipse cx="33" cy="68" rx="5" ry="3" fill="#0047FF" opacity="0.85" />
        <ellipse cx="87" cy="68" rx="5" ry="3" fill="#0047FF" opacity="0.85" />
      </svg>
      {speech ? (
        <div className="absolute -bottom-2 -left-6 -rotate-6 border-2 border-black bg-white px-2 py-0.5 font-display text-xs text-black shadow-brutal">
          {speech}
        </div>
      ) : null}
    </div>
  );
}
