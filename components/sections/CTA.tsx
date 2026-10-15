import { Mascot } from '@/components/design/Mascot';
import { Tape } from '@/components/design/Tape';
import { TornEdge } from '@/components/design/TornEdge';
import { CONTACT_EMAIL } from '@/lib/sample-data';

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t-4 border-black bg-brand-black pb-16 pt-24 text-white"
    >
      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6">
        {/* Transmission marks */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2 text-xs text-neutral-500">
          <span>[ TRANSMISSION: OPEN ]</span>
          <span>LOCATION: GLOBAL REMOTE // AVAILABLE 2026</span>
        </div>

        {/* Giant stacked headline */}
        <div className="relative select-none py-4">
          <div className="relative inline-block">
            <TornEdge
              side="both"
              className="relative -rotate-1 border-2 border-white/20 bg-brand-blue px-6 py-2 shadow-2xl md:py-4"
            >
              <span className="block font-display text-[14vw] font-extrabold uppercase leading-none tracking-tight text-white md:text-[110px] lg:text-[130px]">
                LET&apos;S BUILD
              </span>
              <Tape className="-left-3 -top-4 h-6 w-16 -rotate-12" />
            </TornEdge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-6">
            <span className="font-display text-[15vw] font-black uppercase leading-none tracking-tight text-white drop-shadow-md md:text-[120px] lg:text-[145px]">
              TOGETHER
            </span>
            <Mascot className="h-24 w-24 rotate-6 drop-shadow-[4px_4px_0_#000] md:h-36 md:w-36" />
          </div>
        </div>

        {/* Contact box */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 border-2 border-neutral-700 bg-neutral-900 p-6 shadow-brutal md:grid-cols-12 md:p-8">
          <div className="md:col-span-7">
            <h3 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
              HAVE A PROJECT OR HIGH-SCALE ROLE IN MIND?
            </h3>
            <p className="mt-2 text-xs text-neutral-400 md:text-sm">
              I respond within 24 hours with architecture ideas, estimates, or direct scheduling
              links.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 md:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex-1 border-2 border-black bg-brand-blue px-6 py-3 text-center font-display text-xl uppercase text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black"
            >
              START EMAIL →
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-600 bg-neutral-800 px-5 py-3.5 text-center text-xs uppercase text-white transition-colors hover:bg-neutral-700"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
