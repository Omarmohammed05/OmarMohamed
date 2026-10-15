import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionHeader } from '@/components/design/SectionHeader';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { TornEdge } from '@/components/design/TornEdge';
import { Tape } from '@/components/design/Tape';
import { getProjectBySlug, listProjects } from '@/lib/db';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Work' };
  return {
    title: project.title,
    description: project.tagline || project.description.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const projects = await listProjects();
  const index = projects.findIndex((candidate) => candidate.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  const metaBoxes = [
    { label: 'YEAR', value: project.year ? String(project.year) : '—' },
    { label: 'ROLE', value: project.role || 'FULL-CYCLE BUILD' },
    { label: 'STATUS', value: project.liveUrl ? 'LIVE IN PRODUCTION' : 'ARCHIVED CASE' },
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-black px-6 pb-24 pt-28 text-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            left={`// CASE FILE: ${project.slug.toUpperCase()}`}
            middle={project.tag || 'PROJECT'}
            right={`REF: ${project.year ?? '—'}`}
          />

          <div className="mb-12">
            <TwoToneHeading
              text={project.title.toUpperCase()}
              accent="blue"
              className="m-0 text-5xl text-white md:text-8xl"
            />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
              {project.tagline}
            </p>
          </div>

          {/* Meta dossier */}
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metaBoxes.map((box) => (
              <div
                key={box.label}
                className="border-2 border-neutral-700 bg-neutral-900 p-4 shadow-brutal"
              >
                <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {`// ${box.label}`}
                </span>
                <span className="mt-1 block font-display text-xl uppercase text-white">
                  {box.value}
                </span>
              </div>
            ))}
          </div>

          {/* Brief panel */}
          <TornEdge
            side="both"
            className="relative border-4 border-black bg-brand-paper p-6 text-brand-black shadow-brutal md:p-10"
          >
            <Tape className="-left-4 -top-5 h-7 w-24 -rotate-12" />
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-widest">
              {'// THE BRIEF'}
            </span>
            <p className="whitespace-pre-line text-sm leading-relaxed md:text-base">
              {project.description}
            </p>
          </TornEdge>

          {/* Stack chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {project.tech.map((item) => (
              <span
                key={item}
                className="border-2 border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Gallery (populated via the admin image manager) */}
          {project.gallery.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.gallery.map((src, imageIndex) => (
                <TornEdge
                  key={src}
                  side="both"
                  className="border-2 border-neutral-700 bg-neutral-900 p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} — visual ${imageIndex + 1}`}
                    className="w-full"
                  />
                </TornEdge>
              ))}
            </div>
          ) : null}

          {/* Actions */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black bg-brand-blue px-6 py-3 font-display text-xl uppercase tracking-wide text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black"
              >
                LAUNCH LIVE SITE →
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-neutral-700 bg-neutral-900 px-6 py-3 font-display text-xl uppercase tracking-wide text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black"
              >
                SOURCE CODE
              </a>
            ) : null}
            <Link
              href="/contact"
              className="border border-neutral-600 px-5 py-3.5 text-xs uppercase tracking-widest text-neutral-300 transition-colors hover:bg-neutral-800"
            >
              START A SIMILAR PROJECT
            </Link>
          </div>

          {/* Archive navigation */}
          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-8">
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:text-brand-red"
            >
              ← ALL WORK
            </Link>
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:text-brand-red"
              >
                NEXT: {next.title.toUpperCase()} →
              </Link>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
