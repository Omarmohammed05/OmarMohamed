import { Mascot } from '@/components/design/Mascot';
import { SectionHeader } from '@/components/design/SectionHeader';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { ProjectCard } from './ProjectCard';

export function Work() {
  return (
    <section
      id="work"
      className="torn-top relative z-20 -mt-8 bg-brand-black px-6 pb-28 pt-32 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          left="// 02. PRODUCTION SHOWCASE"
          middle="FLAGSHIP DIGITAL EXPERIENCES"
          right="INDEX [01-03]"
        />

        <div className="mb-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TwoToneHeading
              text="WEBSITES BUILT"
              highlight="BUILT"
              className="m-0 text-6xl text-white md:text-8xl"
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
              Every build is conceived as an interactive statement piece. High tactile
              personality, ultra-tight layout geometry, and extreme client-side speed.
            </p>
          </div>
          <div className="flex lg:col-span-5 lg:justify-end">
            <div className="flex items-center gap-3 border-2 border-neutral-700 bg-neutral-900 p-4 text-xs text-neutral-300 shadow-brutal">
              <span className="inline-block h-3 w-3 animate-ping bg-brand-red" aria-hidden="true" />
              ALL WEBSITES FULLY RESPONSIVE &amp; SEO-OPTIMIZED
            </div>
          </div>
        </div>

        <div className="relative py-10">
          {/* Watermark mascot */}
          <Mascot className="pointer-events-none absolute right-0 top-0 h-96 w-96 opacity-10" />

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Krooked — streetwear e-commerce */}
            <ProjectCard
              title="Krooked Streetwear"
              tag="E-COMMERCE"
              description="Custom headless Shopify storefront with sub-second page loads, algorithmic size advisor, and Stripe 1-click checkout."
              tech="NEXT.JS / GRAPHQL"
              url="krooked-apparel.com"
              year="2025"
              className="-rotate-2 bg-brand-paper"
              tapeClassName="-top-4 right-6 h-6 w-20 rotate-6"
              canvas={
                <div className="relative flex min-h-[220px] flex-col justify-between border-x-0 border-b-0 border-neutral-900 bg-neutral-950 p-4 text-white">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-2xl tracking-wider text-brand-blue">
                      KROOKED.CO
                    </span>
                    <span className="bg-white px-2 py-0.5 text-[9px] font-bold uppercase text-black">
                      SHOP NOW
                    </span>
                  </div>
                  <div className="my-4 border border-white/20 bg-neutral-900/60 p-3">
                    <p className="font-display text-xl leading-tight">
                      LIMITED DROP 004 // TOKYO HEAVYWEIGHT FLEECE
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-400">
                      STOCK: 12 REMAINING // GLOBAL SHIPPING
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-2 text-[10px] text-neutral-400">
                    <span>SHOPIFY HEADLESS</span>
                    <span className="text-emerald-400">+142% CONVERSION</span>
                  </div>
                </div>
              }
            />

            {/* Monolith — architecture studio */}
            <ProjectCard
              title="Monolith Architecture"
              tag="PORTFOLIO"
              description="Interactive 3D model inspector with smooth inertial camera controls, dynamic daylight simulation, and zero bundle bloat."
              tech="THREE.JS / TAILWIND"
              url="monolith-arch.ch"
              year="2026"
              className="rotate-1 bg-white"
              tapeClassName="-top-4 left-6 h-6 w-20 -rotate-12"
              canvas={
                <div className="relative flex min-h-[220px] flex-col justify-between bg-brand-blue p-4 text-white">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-2xl tracking-wider">MONOLITH</span>
                    <span className="bg-black px-2 py-0.5 text-[9px] font-bold uppercase">
                      BERLIN // ZURICH
                    </span>
                  </div>
                  <div className="my-3 border border-white bg-black p-3 text-white">
                    <p className="font-display text-xl leading-none">CONCRETE PAVILION 4</p>
                    <p className="mt-1 text-[10px] text-neutral-400">
                      EXPERIMENTAL RESIDENTIAL SPACE
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2 text-[10px] text-white/80">
                    <span>THREE.JS / WEBGL</span>
                    <span className="font-bold">100 LIGHTHOUSE</span>
                  </div>
                </div>
              }
            />

            {/* Kissa — vinyl lounge */}
            <ProjectCard
              title="Kissa Vinyl Lounge"
              tag="HOSPITALITY / AUDIO"
              description="Low-latency WebAudio live-stream player with real-time seat reservation scheduler and SMS table confirmations."
              tech="NEXT.JS / WEBAUDIO"
              url="kissa-hi-fi.club"
              year="2026"
              className="-rotate-1 bg-brand-paperDark"
              tapeClassName="-top-4 right-10 h-6 w-20 rotate-3"
              canvas={
                <div className="relative flex min-h-[220px] flex-col justify-between bg-neutral-900 p-4 text-white">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-2xl tracking-wider text-amber-400">
                      KISSA AUDIO
                    </span>
                    <span className="bg-brand-red px-2 py-0.5 text-[9px] font-bold uppercase">
                      LIVE SESSION
                    </span>
                  </div>
                  <div className="my-3 border-2 border-amber-400/40 bg-neutral-950 p-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-ping rounded-full bg-brand-red" aria-hidden="true" />
                      <p className="text-xs text-amber-300">NOW STREAMING: VINYL VAULT #41</p>
                    </div>
                    <p className="mt-1 text-[10px] text-neutral-400">
                      TABLE RESERVATION SYSTEM ONLINE
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-2 text-[10px] text-neutral-400">
                    <span>AUDIO API / REST</span>
                    <span className="text-emerald-400">99.9% UPTIME</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
