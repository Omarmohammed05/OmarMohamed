import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Work } from '@/components/sections/Work';
import { Systems } from '@/components/sections/Systems';
import { CTA } from '@/components/sections/CTA';

// ISR: the homepage re-renders from the Neon database at most every 60s
// (admin writes invalidate instantly via revalidateTag).
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Stack />
        <Work />
        <Systems />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
