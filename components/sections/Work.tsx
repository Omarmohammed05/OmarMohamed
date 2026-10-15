import Link from 'next/link';
import { Mascot } from '@/components/design/Mascot';
import { SectionHeader } from '@/components/design/SectionHeader';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectCanvas, projectHost } from './ProjectCanvas';
import { listProjects } from '@/lib/db';

const CARD_STYLES = [
  { className: '-rotate-2 bg-brand-paper', tapeClassName: '-top-4 right-6 h-6 w-20 rotate-6' },
  { className: 'rotate-1 bg-white', tapeClassName: '-top-4 left-6 h-6 w-20 -rotate-12' },
  { className: '-rotate-1 bg-brand-paperDark', tapeClassName: '-top-4 right-10 h-6 w-20 rotate-3' },
] as const;

export async function Work() {
  const projects = (await listProjects()).slice(0, 3);

  return (
    <section
      id="work"
      className="torn-top relative z-20 -mt-8 bg-brand-black px-6 pb-28 pt-32 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          left="// 02. PRODUCTION SHOWCASE"
          middle="FLAGSHIP DIGITAL EXPERIENCES"
          right={`INDEX [01-${String(projects.length).padStart(2, '0')}]`}
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
            {projects.length === 0 ? (
              <p className="col-span-full border-2 border-neutral-700 bg-neutral-900 p-8 text-center font-display text-2xl uppercase text-neutral-400 shadow-brutal">
                NO PROJECTS PUBLISHED YET — THE ARCHIVE IS LOADING.
              </p>
            ) : (
              projects.map((project, index) => {
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
              })
            )}
          </div>

          {projects.length > 0 ? (
            <div className="relative z-10 mt-12 flex justify-center">
              <Link
                href="/projects"
                className="border-2 border-neutral-700 bg-neutral-900 px-6 py-3 font-display text-sm uppercase tracking-widest text-white shadow-brutal transition-colors hover:bg-brand-blue"
              >
                VIEW FULL ARCHIVE →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
