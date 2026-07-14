import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Layers3,
  MapPin,
} from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { education, experiences } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Experience | Shreyas Rasaikar",
  description:
    "Detailed professional experience of Shreyas Rasaikar across real-time sports data, commerce, healthcare, analytics and software quality.",
};

const careerSignals = [
  { value: "Nearly 4 years", label: "Professional experience" },
  { value: "4 companies", label: "Product environments" },
  { value: "Full stack", label: "Data model to interface" },
];

export default function ExperiencePage() {
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

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div>
              <p className="eyebrow">Professional experience</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
                Building reliable products across the{" "}
                <span className="text-emerald-300">full stack.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                My work has progressed from software quality and traditional web
                applications to owning real-time B2B integrations, shared data
                architectures and operational interfaces.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
              {careerSignals.map((signal) => (
                <div key={signal.value} className="bg-slate-950/90 px-5 py-4">
                  <p className="font-semibold text-white">{signal.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{signal.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <article
                key={experience.company}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65"
              >
                <header className="grid gap-7 border-b border-white/10 p-7 sm:p-9 lg:grid-cols-[.34fr_1fr]">
                  <div>
                    <p className="font-semibold text-emerald-300">
                      {experience.period}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {experience.location}
                    </p>
                    {index === 0 && (
                      <span className="mt-5 inline-flex rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        Current role
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <BriefcaseBusiness
                        className="mt-1 h-5 w-5 shrink-0 text-slate-500"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm text-slate-400">
                          {experience.company}
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                          {experience.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                      {experience.summary}
                    </p>
                  </div>
                </header>

                <div className="grid gap-10 p-7 sm:p-9 lg:grid-cols-[.72fr_1.28fr]">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Key contributions
                    </p>
                    <ul className="mt-5 space-y-4">
                      {experience.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex gap-3 text-sm leading-6 text-slate-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {experience.selectedWork?.length ? (
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-violet-300">
                        <Layers3 className="h-4 w-4" aria-hidden="true" />
                        Selected work
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {experience.selectedWork.map((work) => (
                          <div
                            key={work.title}
                            className="rounded-2xl border border-white/10 bg-white/[.03] p-5"
                          >
                            <h3 className="font-semibold text-white">
                              {work.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                              {work.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <footer className="flex flex-wrap gap-2 border-t border-white/10 px-7 py-5 sm:px-9">
                  {experience.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-900/35 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-[.3fr_1fr] md:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10">
            <GraduationCap className="h-9 w-9 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Education</p>
            <h2 className="mt-3 text-2xl font-semibold">
              {education.qualification}
            </h2>
            <p className="mt-2 text-slate-400">
              {education.institution} · {education.period} · {education.result}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="eyebrow">Continue exploring</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            See the systems behind the experience.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Explore selected professional work and full-stack projects, or get
            in touch to discuss the engineering decisions in more detail.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 font-bold text-slate-950"
            >
              View selected work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
