import { Mascot } from '@/components/design/Mascot';
import { SectionHeader } from '@/components/design/SectionHeader';
import { Tape } from '@/components/design/Tape';
import { TwoToneHeading } from '@/components/design/TwoToneHeading';
import { cn } from '@/lib/utils';

type Metric = {
  label: string;
  value: string;
  unit?: string;
  tag?: { text: string; className: string };
  valueClassName?: string;
  bars: number[];
  barClassName: string;
  lastBarClassName?: string;
};

const METRICS: Metric[] = [
  {
    label: 'PAYLOAD INGESTION',
    value: '42,890',
    unit: 'ops/s',
    tag: { text: '', className: '' },
    bars: [40, 65, 50, 85, 100],
    barClassName: 'bg-neutral-700',
    lastBarClassName: 'bg-brand-blue',
  },
  {
    label: 'CACHE HIT RATIO',
    value: '99.4%',
    valueClassName: 'text-brand-blue',
    tag: { text: 'REDIS', className: 'text-emerald-400' },
    bars: [70, 75, 82, 90, 99],
    barClassName: 'bg-neutral-700',
    lastBarClassName: 'bg-white',
  },
  {
    label: 'ACTIVE INSTANCES',
    value: '128',
    unit: 'NODES',
    tag: { text: 'DOCKER', className: 'text-amber-400' },
    bars: [60, 70, 80, 95, 100],
    barClassName: 'bg-brand-blue',
  },
];

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="border-2 border-neutral-700 bg-neutral-900 p-4 shadow-brutal">
      <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
        <span>{metric.label}</span>
        {metric.tag && metric.tag.text ? (
          <span className={metric.tag.className}>{metric.tag.text}</span>
        ) : (
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
        )}
      </div>
      <div className="font-display text-4xl text-white">
        {metric.value}
        {metric.unit ? <span className="text-sm text-neutral-500"> {metric.unit}</span> : null}
      </div>
      <div className="mt-3 flex h-8 items-end gap-1 border-t border-neutral-800 pt-1" aria-hidden="true">
        {metric.bars.map((height, index) => (
          <div
            key={index}
            className={cn(
              'h-full w-full',
              index === metric.bars.length - 1 && metric.lastBarClassName
                ? metric.lastBarClassName
                : metric.barClassName,
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Systems() {
  return (
    <section
      id="systems"
      className="relative border-t-2 border-neutral-800 bg-brand-black px-6 pb-32 pt-20 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          left="// 03. FULL-STACK SYSTEMS"
          middle="SAAS DASHBOARDS & MOBILE INTERFACES"
          right="INDEX [04-06]"
        />

        <div className="mb-14">
          <TwoToneHeading
            text="APPS & SYSTEMS"
            highlight="SYSTEMS"
            className="m-0 text-6xl text-white md:text-8xl"
          />
          <p className="mt-3 max-w-xl text-sm text-neutral-400 md:text-base">
            Complex operational logic compressed into ultra-clean, high-density telemetry
            dashboards and hyper-responsive companion apps.
          </p>
        </div>

        {/* Showcase canvas: phone + dashboard */}
        <div className="relative overflow-hidden border-4 border-neutral-700 bg-neutral-950 p-6 shadow-brutal-lg md:p-10">
          <Tape className="-top-4 left-12 h-7 w-28 -rotate-3" />
          <Tape className="-top-4 right-16 h-7 w-24 rotate-6" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Phone mockup */}
            <div className="flex justify-center lg:col-span-4">
              <div className="relative w-72 -rotate-3 rounded-[36px] border-4 border-neutral-600 bg-black p-3 shadow-2xl transition-transform duration-300 hover:rotate-0">
                <Tape className="-top-3 right-6 h-5 w-16 rotate-12" />
                <div className="mx-auto mb-3 flex h-4 w-24 items-center justify-center rounded-full bg-neutral-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-3 rounded-[26px] border border-neutral-800 bg-neutral-900 p-4 text-xs text-white">
                  {/* Profile header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue font-display text-sm text-white">
                        O
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold">@omar.dev</span>
                        <span className="text-[9px] text-neutral-400">Full-Stack System</span>
                      </div>
                    </div>
                    <span className="bg-white px-2 py-0.5 text-[9px] font-bold uppercase text-black">
                      LIVE
                    </span>
                  </div>
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-1 border border-neutral-800 bg-black p-2 text-center">
                    <div>
                      <span className="block font-display text-base text-brand-blue">1.4M</span>
                      <span className="text-[8px] text-neutral-400">REQ/DAY</span>
                    </div>
                    <div>
                      <span className="block font-display text-base text-white">18ms</span>
                      <span className="text-[8px] text-neutral-400">LATENCY</span>
                    </div>
                    <div>
                      <span className="block font-display text-base text-emerald-400">99.9%</span>
                      <span className="text-[8px] text-neutral-400">UPTIME</span>
                    </div>
                  </div>
                  {/* Service thumbnails */}
                  <div className="flex justify-between gap-2 py-1">
                    {['API', 'DB', 'AUTH', 'OPS'].map((tag) => (
                      <div
                        key={tag}
                        className="h-10 w-10 rounded-full border-2 border-brand-blue p-0.5"
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-700 text-[8px] font-bold">
                          {tag}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Feed card */}
                  <div className="border border-neutral-800 bg-black p-3 text-[10px]">
                    <div className="mb-1 flex justify-between text-neutral-400">
                      <span>EVENT_BUS</span>
                      <span className="font-bold text-emerald-400">HEALTHY</span>
                    </div>
                    <p className="text-neutral-300">
                      Cluster auto-scaled: +4 worker pods initialized in eu-west-1.
                    </p>
                  </div>
                  {/* Bottom bar */}
                  <div className="flex justify-around pt-2 text-sm text-neutral-500" aria-hidden="true">
                    <span>◼</span>
                    <span>●</span>
                    <span>▲</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard panel */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-4 sm:flex-row sm:items-center">
                <div>
                  <span className="bg-brand-blue px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-brutal">
                    ENTERPRISE ARCHITECTURE
                  </span>
                  <h3 className="mt-1 font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
                    VORTEX // REAL-TIME DISPATCH &amp; TELEMETRY
                  </h3>
                </div>
                <div className="text-xs text-neutral-400">CLIENT: LOGISTICS CORE // EU</div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {METRICS.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </div>

              <div className="border border-neutral-700 bg-neutral-900/90 p-5 text-xs leading-relaxed text-neutral-300">
                <span className="mb-1 block font-bold uppercase tracking-wider text-brand-blue">
                  {'// SYSTEM ARCHITECTURE BREAKDOWN:'}
                </span>
                Engineered with a fault-tolerant Go microservices backend, connected via gRPC
                streams to a Next.js front-panel. Utilizes PostgreSQL partitioned tables for
                10-year audit trail indexing and WebSocket broadcast channels to push live
                telemetry updates to thousands of concurrent operations staff without lag.
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white px-3 py-1 text-xs font-bold text-black shadow-brutal">
                  GO / NEXT.JS / POSTGRESQL / DOCKER
                </span>
                <a
                  href="#contact"
                  className="border border-black bg-brand-blue px-4 py-1 text-xs font-bold text-white shadow-brutal transition-colors hover:bg-white hover:text-brand-black"
                >
                  REQUEST SYSTEM BLUEPRINTS →
                </a>
              </div>
            </div>
          </div>

          <Mascot className="pointer-events-none absolute -bottom-6 -right-6 z-20 h-28 w-28 -rotate-12 opacity-90" />
        </div>
      </div>
    </section>
  );
}
