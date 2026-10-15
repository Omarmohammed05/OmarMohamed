import { TornEdge } from '@/components/design/TornEdge';
import { getSiteContent } from '@/lib/db';

export async function SiteFooter() {
  const { contactEmail, servicesTicker, socialLinks } = await getSiteContent();
  return (
    <TornEdge
      side="top"
      className="relative z-20 -mt-8 bg-brand-paper px-6 pb-8 pt-12 text-brand-black"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Services ticker */}
        <div className="overflow-hidden border-y-2 border-black py-2.5">
          <div className="flex flex-wrap justify-center gap-x-6 font-display text-lg uppercase tracking-wider text-black sm:justify-between sm:whitespace-nowrap md:text-2xl">
            {servicesTicker.map((service) => (
              <span key={service} className="flex items-center gap-6">
                {service}
                <span className="text-brand-red" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Contact / socials / copyright */}
        <div className="flex flex-col items-center justify-between gap-6 pt-2 text-xs font-bold md:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="border border-black bg-black px-4 py-2 uppercase text-white shadow-brutal transition-colors hover:bg-brand-red"
            >
              CONTACT ME
            </a>
            <span className="text-neutral-700">WWW.OMAR.DEV // {contactEmail.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-brutal transition-colors hover:bg-brand-red"
              >
                {link.abbr}
              </a>
            ))}
          </div>

          <div className="text-[11px] text-neutral-600">
            © 2026 OMAR. ALL RIGHTS RESERVED. HAND-CODED WITH TACTILE PRECISION.
          </div>
        </div>
      </div>
    </TornEdge>
  );
}
