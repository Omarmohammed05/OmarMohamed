import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { StickerLabel } from '@/components/design/StickerLabel';
import { Tape } from '@/components/design/Tape';
import { TornEdge } from '@/components/design/TornEdge';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { getAdminSession } from '@/lib/admin-session';
import { logout } from './actions';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

/**
 * Phase 4 stub — proves the authenticated shell works end to end.
 * The real CMS dashboard (projects, content, images) lands in Phase 5.
 */
export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-black px-6 py-16">
      <TornEdge
        side="both"
        className="relative w-full max-w-lg rotate-1 border-4 border-black bg-brand-paper p-6 pt-10 text-brand-black shadow-brutal-lg md:p-8 md:pt-12"
      >
        <Tape className="-top-5 left-1/2 h-7 w-28 -translate-x-1/2 rotate-2" />
        <StickerLabel className="mb-6">ACCESS: GRANTED</StickerLabel>
        <TwoToneHeading text="MISSION CONTROL" highlight="CONTROL" level={1} className="text-5xl" />
        <p className="mb-4 mt-3 text-xs leading-relaxed text-neutral-600">
          Authenticated as
        </p>
        <p className="mb-8 inline-block border-2 border-black bg-white px-3 py-2 font-body text-sm font-bold shadow-brutal">
          {session.sub.toUpperCase()}
        </p>
        <p className="mb-8 text-xs uppercase tracking-widest text-neutral-500">
          The CMS dashboard arrives in Phase 5.
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="border-4 border-black bg-brand-red px-6 py-3 font-display text-lg uppercase text-white shadow-brutal transition-colors hover:bg-brand-black"
          >
            LOG OUT ←
          </button>
        </form>
      </TornEdge>
    </main>
  );
}
