import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Github,
  Layers3,
  TriangleAlert,
  Users,
} from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { independentProjects } from "@/lib/constants";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return independentProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = independentProjects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title + " Case Study | Shreyas Rasaikar",
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = independentProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />

      <section className="relative isolate border-b border-white/5 pb-20 pt-36">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <p className="eyebrow mt-10">{project.context}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 font-bold text-slate-950"
              >
                Open live demo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View source
            </a>
          </div>
        </div>
      </section>

      {project.images?.length ? (
        <section className="border-b border-white/5 bg-slate-900/35 py-16">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
            {project.images.map((image) => (
              <div
                key={image.src}
                className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
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
        </section>
      ) : null}

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The problem</p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {project.problem}
            </p>
          </div>
          <div>
            <p className="eyebrow">The solution</p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-900/35 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
            <Users className="h-4 w-4" aria-hidden="true" />
            Product workflows
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            One product, different responsibilities.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {project.users.map((user) => (
              <article
                key={user.role}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <h3 className="text-xl font-semibold">{user.role}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {user.capabilities}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-violet-300">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            Architecture
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Clear boundaries across the stack.
          </h2>
          <div className="mt-10 space-y-4">
            {project.architecture.map((layer, index) => (
              <article
                key={layer.layer}
                className="grid gap-5 rounded-2xl border border-white/10 bg-white/[.03] p-6 md:grid-cols-[.3fr_1fr]"
              >
                <div>
                  <p className="text-xs text-slate-500">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold">{layer.layer}</h3>
                </div>
                <div>
                  <p className="leading-7 text-slate-400">{layer.details}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {layer.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-900/35 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
            <Check className="h-4 w-4" aria-hidden="true" />
            Engineering decisions
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.decisions.map((decision) => (
              <article
                key={decision.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <h3 className="text-xl font-semibold">{decision.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {decision.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Technology</p>
            <h2 className="mt-4 text-3xl font-semibold">
              Tools selected for the product.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-7">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-amber-300">
              <TriangleAlert className="h-4 w-4" aria-hidden="true" />
              Current limitations
            </p>
            <ul className="mt-5 space-y-4">
              {project.limitations.map((limitation) => (
                <li
                  key={limitation}
                  className="flex gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="eyebrow">Explore further</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Review the product or inspect the implementation.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 font-bold text-slate-950"
              >
                Live demo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub repository
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
