import { Tape } from '@/components/design/Tape';
import { getSiteContent } from '@/lib/db';

export async function Stack() {
  const { skills, stackItems, approachSteps } = await getSiteContent();
  return (
    <section id="stack" className="relative z-30 bg-brand-paper px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Blue wrapped panel */}
        <div className="relative border-4 border-black bg-brand-blue p-6 text-white shadow-brutal-lg md:p-14">
          <Tape className="-left-4 -top-4 h-8 w-28 -rotate-12" />
          <Tape className="-right-4 -top-4 h-8 w-28 rotate-12" />
          <Tape className="-bottom-4 -left-4 h-8 w-28 rotate-6" />
          <Tape className="-bottom-4 -right-4 h-8 w-28 -rotate-6" />

          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-white/30 pb-4 text-xs uppercase tracking-widest">
            <span className="bg-black px-3 py-1 font-bold text-white shadow-brutal">
              CORE STACK &amp; METHODOLOGY
            </span>
            <span className="text-white/80">[ REF: 2026 // FULL_CYCLE_SYSTEM ]</span>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Skills */}
            <div className="flex flex-col gap-4 md:col-span-3">
              <h3 className="border-b-2 border-white/20 pb-2 font-display text-4xl uppercase tracking-tight lg:text-5xl">
                SKILLS
              </h3>
              <ul className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-white/95 md:text-sm">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 bg-black" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack chips */}
            <div className="flex flex-col gap-4 md:col-span-4">
              <h3 className="border-b-2 border-white/20 pb-2 font-display text-4xl uppercase tracking-tight lg:text-5xl">
                STACK
              </h3>
              <p className="text-xs text-white/90">
                Modern, production-proven tools battle-tested under load:
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {stackItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/20 bg-black p-3 text-white shadow-brutal transition-colors hover:bg-white hover:text-black"
                  >
                    <span className="font-display text-2xl">{item.abbr}</span>
                    <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div className="flex flex-col gap-4 md:col-span-5">
              <h3 className="border-b-2 border-white/20 pb-2 font-display text-4xl uppercase tracking-tight lg:text-5xl">
                APPROACH TO BUILD
              </h3>
              <div className="space-y-4">
                {approachSteps.map((step) => (
                  <div key={step.title} className="border-l-4 border-black bg-black/30 p-3.5">
                    <span className="mb-1 block text-xs font-bold uppercase text-white">
                      {step.title}
                    </span>
                    <p className="text-xs leading-relaxed text-white/90">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
