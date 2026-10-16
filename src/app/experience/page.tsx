import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
} from "lucide-react";
import ProfessionalWork from "@/components/professional-work";
import { education, experiences } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Experience | Shreyas Rasaikar",
  description:
    "Detailed professional experience of Shreyas Rasaikar across real-time sports data, commerce, healthcare, analytics and software quality.",
};

const careerSignals = [
  { value: "4+ years", label: "Professional experience" },
  { value: "4 companies", label: "Product environments" },
  { value: "Full stack", label: "Data model to interface" },
];

export default function ExperiencePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-page text-foreground"
    >
      <section className="relative isolate border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to overview
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div>
              <p className="eyebrow">Professional experience</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                Building reliable products across the{" "}
                <span className="text-accent">full stack.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-body">
                My work has progressed from software quality and traditional web
                applications to owning real-time B2B integrations, shared data
                architectures and operational interfaces.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-tint-strong sm:grid-cols-3 lg:grid-cols-1">
              {careerSignals.map((signal) => (
                <div key={signal.value} className="bg-page/90 px-5 py-4">
                  <p className="font-semibold text-foreground">{signal.value}</p>
                  <p className="mt-1 text-xs text-secondary">{signal.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Career history" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <article
                key={experience.company}
                className={`border-t border-line ${index === 0 ? "border-l-2 border-l-accent bg-subtle pl-5 sm:pl-8" : ""}`}
              >
                <header className="grid gap-5 pt-8 lg:grid-cols-[.34fr_1fr] lg:gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-accent">
                        {experience.period}
                      </p>
                      {index === 0 && (
                        <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          Current role
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex items-center gap-2 text-sm text-secondary">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {experience.location}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <BriefcaseBusiness
                        className="mt-1 h-5 w-5 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm text-secondary">
                          {experience.company}
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                          {experience.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
                      {experience.summary}
                    </p>
                  </div>
                </header>

                <div className="mt-8 grid gap-8 pb-8 lg:grid-cols-[.34fr_1fr] lg:gap-10">
                  <div className="lg:col-start-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Key contributions
                      </h3>
                      <ul className="mt-4 max-w-3xl space-y-3">
                        {experience.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex gap-3 leading-7 text-body"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {experience.selectedWork?.length ? (
                      <section
                        className="mt-8 border-t border-line pt-6"
                        aria-labelledby={`selected-work-${index}`}
                      >
                        <h3
                          id={`selected-work-${index}`}
                          className="text-lg font-semibold"
                        >
                          Associated work
                          <span className="sr-only"> at {experience.company}</span>
                        </h3>
                        <div className="mt-4 divide-y divide-line">
                          {experience.selectedWork.map((work) => (
                            <div
                              key={work.title}
                              className="py-4 first:pt-0 last:pb-0"
                            >
                              <h4 className="font-semibold text-foreground">
                                {work.slug ? (
                                  <Link
                                    href={"/projects/" + work.slug}
                                    className="inline-flex min-h-11 items-center gap-2 underline decoration-accent/40 underline-offset-4 hover:text-accent"
                                  >
                                    {work.title}
                                    <ArrowUpRight
                                      className="h-4 w-4 shrink-0"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                ) : (
                                  work.title
                                )}
                              </h4>
                              <p className="mt-2 max-w-3xl leading-7 text-secondary">
                                {work.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    ) : null}
                    <dl className="mt-8 border-t border-line pt-5">
                      <dt className="text-sm font-semibold">Technologies used</dt>
                      <dd className="mt-2 leading-7 text-secondary">
                        {experience.stack.join(", ")}
                      </dd>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProfessionalWork />

      <section className="border-y border-line bg-subtle py-12 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-[.3fr_1fr] md:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl border border-accent/20 bg-accent/10">
            <GraduationCap className="h-9 w-9 text-accent" aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Education</p>
            <h2 className="mt-3 text-2xl font-semibold">
              {education.qualification}
            </h2>
            <p className="mt-2 text-secondary">
              {education.institution} · {education.period} · {education.result}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="eyebrow">Continue exploring</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            See the systems behind the experience.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-secondary">
            Explore selected professional work and full-stack projects, or get
            in touch to discuss the engineering decisions in more detail.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 font-bold text-on-action"
            >
              View selected work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-line bg-tint px-6 py-3.5 font-semibold text-foreground"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
