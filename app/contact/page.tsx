import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionHeader } from '@/components/design/SectionHeader';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { TornEdge } from '@/components/design/TornEdge';
import { Tape } from '@/components/design/Tape';
import { ContactForm } from '@/components/contact/ContactForm';
import { getSiteContent } from '@/lib/db';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project or a high-scale role conversation — response within 24 hours.',
};

export default async function ContactPage() {
  const { contactEmail, socialLinks } = await getSiteContent();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-black px-6 pb-24 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader left="// TRANSMISSION: OPEN" middle="DIRECT CONTACT" right="RESPONSE < 24H" />

          <div className="mb-12">
            <TwoToneHeading
              text="SEND A SIGNAL"
              highlight="SIGNAL"
              accent="blue"
              className="m-0 text-6xl text-white md:text-8xl"
            />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
              Have a project or high-scale role in mind? Transmit the brief below — every
              message lands directly in the studio inbox with a response inside 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <TornEdge
              side="both"
              className="relative -rotate-1 border-4 border-black bg-brand-paper p-6 text-brand-black shadow-brutal-lg md:p-8 lg:col-span-7"
            >
              <Tape className="-top-5 left-8 h-7 w-24 -rotate-6" />
              <h2 className="mb-6 font-display text-2xl uppercase tracking-tight md:text-3xl">
                {'// TRANSMISSION FORM'}
              </h2>
              <ContactForm />
            </TornEdge>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="border-2 border-neutral-700 bg-neutral-900 p-6 shadow-brutal">
                <h3 className="font-display text-xl uppercase text-white">DIRECT LINE</h3>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-3 inline-block border-2 border-black bg-brand-blue px-4 py-2 font-display text-lg uppercase text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black"
                >
                  {contactEmail.toUpperCase()}
                </a>
                <p className="mt-3 text-[11px] uppercase tracking-widest text-neutral-500">
                  GLOBAL REMOTE // AVAILABLE 2026
                </p>
              </div>

              <div className="border-2 border-neutral-700 bg-neutral-900 p-6">
                <h3 className="font-display text-xl uppercase text-white">SIGNALS</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="flex items-center justify-between border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                      >
                        <span>{link.label}</span>
                        <span className="text-brand-red">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
