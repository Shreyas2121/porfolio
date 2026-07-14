import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { independentProjects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects | Shreyas Rasaikar",
  description:
    "Full-stack project case studies covering architecture, product workflows, engineering decisions and current limitations.",
};

export default function ProjectsPage() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />

      <section className="relative isolate border-b border-white/5 pb-20 pt-36">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to overview
          </Link>
          <p className="eyebrow mt-10">Full-stack projects</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
            Products designed beyond the{" "}
            <span className="text-emerald-300">happy path.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            These projects explore the parts of product engineering that are
            easy to overlook: authorization, state transitions, external
            integrations, operational workflows and failure handling.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">
          {independentProjects.map((project, index) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65"
            >
              {project.images?.length ? (
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {project.images.slice(0, 2).map((image) => (
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

              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
                    Case study 0{index + 1}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-violet-300">
                    {project.context}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-lg leading-8 text-slate-300">
                    {project.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-5">
                    <Link
                      href={"/projects/" + project.slug}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-slate-950"
                    >
                      Read case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-1 py-3 text-sm font-semibold text-white hover:text-emerald-300"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Source
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-1 py-3 text-sm font-semibold text-white hover:text-emerald-300"
                      >
                        Live demo
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
