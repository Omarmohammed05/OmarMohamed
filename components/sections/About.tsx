import { Mascot } from '@/components/design/Mascot';
import { Tape } from '@/components/design/Tape';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    title: '01 // FRONTEND OBSESSION',
    accent: 'text-brand-red',
    body: 'Pixel-precision, fluid 60fps micro-animations, semantic clean HTML, zero runtime waste.',
  },
  {
    title: '02 // SCALABLE BACKEND',
    accent: 'text-brand-black',
    body: 'PostgreSQL, Redis caching, robust REST/GraphQL APIs, distributed worker queues.',
  },
];

export function About() {
  return (
    <section
      id="about"
      className="torn-top relative z-30 -mt-8 bg-brand-paper px-6 py-24 text-brand-black"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section marks */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-widest">
          <span>{'// 01. DOSSIER // OMAR'}</span>
          <span>STATUS: OPEN FOR FREELANCE &amp; CONTRACT</span>
          <span>YEAR 2026</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Bio column */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="-rotate-1">
              <TwoToneHeading text="ABOUT ME" highlight="ME" className="m-0 text-6xl md:text-8xl" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-brand-blue px-3 py-1 text-xs font-bold uppercase text-white shadow-brutal">
                CREATIVE ENGINEER &amp; ARCHITECT
              </span>
              <span className="text-xs uppercase tracking-wider text-neutral-600">
                BASED IN CAIRO // WORKING WORLDWIDE
              </span>
            </div>

            <p className="font-display text-2xl uppercase leading-snug tracking-tight text-neutral-900 md:text-3xl">
              Specializing in high-performance web applications, scalable backends, and tactile
              digital identities that dominate screens.
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-700 md:text-base">
              With 5+ years building software from the ground up, I bridge the raw tension
              between daring visual aesthetic and uncompromising technical engineering. Whether
              it is a real-time reactive SaaS dashboard, an interactive headless e-commerce store,
              or micro-optimized API systems, every line of code is measured for performance,
              accessibility, and conversion.
            </p>

            <div className="grid grid-cols-1 gap-4 border-t-2 border-black/10 pt-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="border-2 border-black bg-white p-4 shadow-brutal">
                  <span className={cn('block font-display text-lg', feature.accent)}>
                    {feature.title}
                  </span>
                  <p className="mt-1 text-xs text-neutral-600">{feature.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <span className="border border-neutral-400 bg-brand-paperDark px-3 py-1 text-xs text-neutral-800">
                ⚡ 100% CLIENT RETENTION 2025
              </span>
              <span className="border border-neutral-400 bg-brand-paperDark px-3 py-1 text-xs text-neutral-800">
                🛡️ ZERO-DOWNTIME DEPLOYMENT RECORD
              </span>
            </div>
          </div>

          {/* Polaroid portrait column */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-md rotate-2 border-4 border-black bg-white p-4 shadow-brutal-lg md:p-6">
              <Tape className="-top-5 left-10 h-7 w-24 -rotate-6" />
              <Tape className="-bottom-5 right-8 h-7 w-24 rotate-3" />

              <div className="relative flex h-[420px] w-full items-end justify-center overflow-hidden border-2 border-black bg-neutral-200">
                {/* Blue arch backdrop */}
                <div className="absolute bottom-0 h-80 w-64 rounded-t-full bg-brand-blue" aria-hidden="true" />
                {/* Hoodie developer silhouette */}
                <svg
                  viewBox="0 0 260 320"
                  className="relative z-10 w-64 drop-shadow-xl"
                  role="img"
                  aria-label="Illustration of Omar in a black hoodie, in dev mode"
                >
                  <circle cx="130" cy="80" r="42" fill="#E8C5A5" stroke="#000" strokeWidth="3" />
                  <path
                    d="M 94 65 C 90 35, 145 28, 166 45 C 172 65, 168 85, 164 85 C 158 85, 150 55, 130 55 C 105 55, 100 80, 94 65 Z"
                    fill="#1A1818"
                  />
                  <path d="M 106 95 C 114 125, 146 125, 154 95 Z" fill="#2B2626" />
                  <path
                    d="M 60 320 L 70 160 C 85 130, 110 120, 130 120 C 150 120, 175 130, 190 160 L 200 320 Z"
                    fill="#111111"
                    stroke="#000"
                    strokeWidth="4"
                  />
                  <rect x="118" y="195" width="24" height="8" rx="1" fill="#0047FF" />
                  <path
                    d="M 115 140 Q 112 185 110 210"
                    fill="none"
                    stroke="#FFF"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M 145 140 Q 148 185 150 210"
                    fill="none"
                    stroke="#FFF"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <Mascot className="absolute right-4 top-4 z-20 h-20 w-20 rotate-12" />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-hand text-xl font-bold text-neutral-800">
                <span>Omar in dev mode, 2026</span>
                <span className="bg-black px-2 py-0.5 text-xs uppercase text-white">
                  DEV_ID_#084
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
