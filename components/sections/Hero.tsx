import { Mascot } from '@/components/design/Mascot';
import { StickerLabel } from '@/components/design/StickerLabel';
import { Tape } from '@/components/design/Tape';
import { TornEdge } from '@/components/design/TornEdge';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-brand-black bg-grid-zine pb-16 pt-24"
    >
      {/* Corner marks */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-xs uppercase tracking-widest text-neutral-400">
          <span>[ OMAR_PORTFOLIO ]</span>
          <span>[ EDITION: 2026 ]</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:py-12">
        <StickerLabel>Web Developer &amp; Software Engineer</StickerLabel>

        {/* Giant title + torn blue strip overlay */}
        <div className="relative my-2 select-none">
          <h1 className="m-0 p-0 font-display text-[19vw] font-black uppercase leading-[0.8] tracking-tighter text-white drop-shadow-lg md:text-[185px] lg:text-[210px]">
            PORTFOLIO
          </h1>
          <TornEdge
            side="both"
            className="absolute left-1/4 top-1/2 z-20 w-[72%] -translate-y-1/2 -rotate-1 border-y-2 border-white/20 bg-brand-blue px-4 py-3 shadow-2xl md:w-[60%] md:px-6 md:py-5 lg:w-[54%]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-[9vw] font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-[88px] lg:text-[104px]">
                FOLIO
              </span>
              <span className="hidden bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-brutal sm:inline-block">
                SYS // 2026
              </span>
            </div>
            <Tape className="-bottom-3 -right-3 h-6 w-16 rotate-6" />
            <Tape className="-left-3 -top-3 h-5 w-14 -rotate-12" />
          </TornEdge>

          <Mascot
            speech="HELLO WORLD!"
            className="absolute -right-2 -top-8 z-30 h-28 w-28 rotate-6 transition-transform duration-300 hover:scale-105 md:-top-12 md:right-8 md:h-44 md:w-44"
          />
        </div>

        {/* Year pill */}
        <div className="mb-8 mt-2 flex translate-y-2 justify-end pr-8 md:pr-24">
          <span className="rotate-1 border-2 border-neutral-700 bg-neutral-900 px-6 py-1 font-display text-3xl tracking-widest text-white/90 shadow-brutal md:text-5xl">
            2026
          </span>
        </div>

        {/* Two-column deck: code editor + pitch */}
        <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Tape className="-top-3 left-10 h-6 w-20 -rotate-3" />
            <div className="overflow-hidden border-2 border-neutral-700 bg-neutral-950 shadow-brutal-lg">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full border border-black bg-brand-red" />
                  <span className="inline-block h-3 w-3 rounded-full border border-black bg-amber-400" />
                  <span className="inline-block h-3 w-3 rounded-full border border-black bg-emerald-500" />
                  <span className="ml-2 text-[11px] text-neutral-300">
                    developer.ts — Omar&apos;s Engine
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase text-neutral-500">TypeScript 5.4</span>
              </div>
              <div className="overflow-x-auto p-5 text-xs leading-relaxed text-neutral-200 md:text-sm">
                <div className="text-neutral-500">{'// Modern high-velocity software engineering'}</div>
                <div>
                  <span className="font-bold text-brand-blue">interface</span>{' '}
                  <span className="text-amber-300">Engineer</span> {'{'}
                </div>
                <div className="pl-4">
                  name: <span className="text-emerald-400">&apos;Omar&apos;</span>;
                </div>
                <div className="pl-4">
                  role: <span className="text-emerald-400">&apos;Full-Stack Web Architect&apos;</span>;
                </div>
                <div className="pl-4">
                  stack: [<span className="text-emerald-400">&apos;Next.js&apos;</span>,{' '}
                  <span className="text-emerald-400">&apos;TypeScript&apos;</span>,{' '}
                  <span className="text-emerald-400">&apos;Tailwind&apos;</span>,{' '}
                  <span className="text-emerald-400">&apos;Node&apos;</span>,{' '}
                  <span className="text-emerald-400">&apos;Postgres&apos;</span>];
                </div>
                <div className="pl-4">
                  mantra: <span className="text-emerald-400">&apos;Precision, Tactile UI, 99+ Performance&apos;</span>;
                </div>
                <div>{'}'}</div>
                <div className="mt-2">
                  <span className="font-bold text-brand-blue">export async function</span>{' '}
                  <span className="text-sky-300">buildFuture</span>(
                  <span className="text-purple-300">vision</span>: <span className="text-amber-300">Project</span>) {'{'}
                </div>
                <div className="pl-4 text-neutral-400">
                  const execution = <span className="font-bold text-brand-blue">await</span>{' '}
                  craftWithUncompromisingCraft(vision);
                </div>
                <div className="pl-4 text-emerald-400">
                  return execution.shipToProduction();{' '}
                  <span className="terminal-cursor font-bold text-brand-blue">_</span>
                </div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="relative rotate-1 border-2 border-white/20 bg-neutral-900 p-6 shadow-brutal">
              <Tape className="-top-4 right-8 h-6 w-16 rotate-6" />
              <p className="font-display text-2xl uppercase leading-tight tracking-wide text-white md:text-3xl">
                CRAFTING LOUD, FAST &amp; BULLETPROOF{' '}
                <span className="text-brand-blue">DIGITAL SYSTEMS</span>.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-300 md:text-sm">
                Merging high-octane visual identity with rock-solid full-stack software
                architecture. Zero fluff. Extreme speed.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
                <div>
                  <span className="block font-display text-3xl text-brand-blue">99.8%</span>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                    LIGHTHOUSE SPEED
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl text-white">40+</span>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                    PROJECTS SHIPPED
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#work"
                className="flex-1 border-2 border-black bg-white px-4 py-2.5 text-center font-display text-lg uppercase text-brand-black shadow-brutal transition-all hover:bg-brand-blue hover:text-white"
              >
                EXPLORE WORKS ↓
              </a>
              <a
                href="#about"
                className="border border-neutral-600 bg-neutral-800 px-4 py-3 text-xs uppercase text-white transition-colors hover:bg-neutral-700"
              >
                README.MD
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto mt-8 flex w-full max-w-7xl items-center justify-between px-6 text-xs text-neutral-500">
        <span>[SCROLL TO UNPACK ENGINE]</span>
        <span className="animate-bounce">↓ 01_ABOUT_ME</span>
      </div>
    </section>
  );
}
