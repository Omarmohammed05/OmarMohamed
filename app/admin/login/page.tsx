import type { Metadata } from 'next';
import { StickerLabel } from '@/components/design/StickerLabel';
import { Tape } from '@/components/design/Tape';
import { TornEdge } from '@/components/design/TornEdge';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

/** Only allow redirects back into the admin panel (no open redirects). */
function safeNext(raw: string): string {
  return raw.startsWith('/admin') && !raw.startsWith('//') ? raw : '/admin';
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-black px-6 py-16">
      <TornEdge
        side="both"
        className="relative w-full max-w-md -rotate-1 border-4 border-black bg-brand-paper p-6 pt-10 text-brand-black shadow-brutal-lg md:p-8 md:pt-12"
      >
        <Tape className="-top-5 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3" />
        <StickerLabel className="mb-6">ACCESS: RESTRICTED</StickerLabel>
        <TwoToneHeading text="BACKSTAGE" highlight="PASS" level={1} className="text-5xl" />
        <p className="mb-8 mt-3 text-xs leading-relaxed text-neutral-600">
          Admins only. Enter your credentials to manage projects and site content.
        </p>
        <LoginForm next={safeNext(next ?? '/admin')} />
      </TornEdge>
    </main>
  );
}
