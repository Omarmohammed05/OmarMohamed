import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionHeader } from '@/components/design/SectionHeader';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { ProjectCanvas, projectHost } from '@/components/sections/ProjectCanvas';
import { listProjects } from '@/lib/db';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects — loud, fast and bulletproof digital systems by Omar.',
};

const CARD_STYLES = [
  { className: '-rotate-2 bg-brand-paper', tapeClassName: '-top-4 right-6 h-6 w-20 rotate-6' },
  { className: 'rotate-1 bg-white', tapeClassName: '-top-4 left-6 h-6 w-20 -rotate-12' },
  { className: '-rotate-1 bg-brand-paperDark', tapeClassName: '-top-4 right-10 h-6 w-20 rotate-3' },
] as const;

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-black px-6 pb-24 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            left="// PRODUCTION SHOWCASE"
            middle="ALL PUBLISHED WORK"
            right={`INDEX [01-${String(projects.length).padStart(2, '0')}]`}
          />

          <div className="mb-16">
            <TwoToneHeading
              text="WORK ARCHIVE"
              highlight="ARCHIVE"
              className="m-0 text-6xl text-white md:text-8xl"
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
              Every build is conceived as an interactive statement piece — high tactile
              personality, ultra-tight layout geometry, and extreme client-side speed.
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="border-2 border-neutral-700 bg-neutral-900 p-8 text-center font-display text-2xl uppercase text-neutral-400 shadow-brutal">
              NO PROJECTS PUBLISHED YET — THE ARCHIVE IS LOADING.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const style = CARD_STYLES[index % CARD_STYLES.length];
                return (
                  <ProjectCard
                    key={project.slug}
                    title={project.title}
                    tag={project.tag}
                    description={project.description}
                    tech={project.tech.join(' / ')}
                    url={projectHost(project)}
                    year={project.year ? String(project.year) : '—'}
                    href={`/projects/${project.slug}`}
                    className={style.className}
                    tapeClassName={style.tapeClassName}
                    canvas={<ProjectCanvas project={project} variant={index} />}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
