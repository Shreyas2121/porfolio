import { caseStudies, independentProjects } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Github,
  Radio,
  ShieldCheck,
} from "lucide-react";

const icons = {
  architecture: Blocks,
  realtime: Radio,
  reliability: ShieldCheck,
};

const accents = {
  violet: "from-violet-500/25 to-indigo-500/5 text-violet-200",
  emerald: "from-emerald-500/25 to-teal-500/5 text-emerald-200",
  amber: "from-amber-500/25 to-orange-500/5 text-amber-200",
};

export default function Projects() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-y border-white/5 bg-slate-900/35 py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">Selected work</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Products I have helped take from complexity to clarity.
          </h2>
          <p className="max-w-md text-slate-400">
            Sanitised professional case studies focused on ownership, technical
            decisions and delivered outcomes.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {caseStudies.map((project, index) => {
            const Icon = icons[project.icon];
            return (
              <article
                key={project.title}
                className="grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900 lg:grid-cols-[.72fr_1.28fr]"
              >
                <div
                  className={
                    "relative flex min-h-64 flex-col justify-between bg-gradient-to-br p-7 sm:p-9 " +
                    accents[project.accent]
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[.18em]">
                      Case study 0{index + 1}
                    </span>
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">{project.context}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  {project.images?.length ? (
                    <div className="mb-8 grid gap-3 sm:grid-cols-2">
                      {project.images.map((image) => (
                        <div
                          key={image.src}
                          className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <p className="max-w-3xl text-lg leading-8 text-slate-300">
                    {project.summary}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {[
                      ["My role", project.role],
                      ["Challenge", project.challenge],
                      ["Outcome", project.outcome],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-300">
                          {label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Independent builds</p>
            <h3 className="mt-3 text-3xl font-semibold">
              Ideas built beyond client work.
            </h3>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-emerald-300"
          >
            Explore all project case studies
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {independentProjects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]"
            >
              {project.images?.length ? (
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {project.images.map((image) => (
                    <div
                      key={image.src}
                      className="relative aspect-video bg-slate-900"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-300">
                  {project.context}
                </p>
                <h4 className="mt-2 text-2xl font-semibold">{project.title}</h4>
                <p className="mt-3 leading-7 text-slate-400">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-5">
                  <Link
                    href={"/projects/" + project.slug}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    Read case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-300"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                  </a>
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-300"
                    >
                      Live demo
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
