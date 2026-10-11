import { experiences } from "@/lib/constants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">Experience</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Four years of learning by shipping.
        </h2>
        <div className="mt-8 border-t border-line">
          {experiences.map((experience, index) => (
            <article
              key={experience.company}
              className={`grid gap-3 border-b border-line py-6 md:grid-cols-[.38fr_1fr] md:gap-6 ${index === 0 ? "border-l-2 border-l-accent bg-subtle pl-4 sm:pl-6" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-3 md:block">
                <p className="text-sm font-semibold text-accent">
                  {experience.period}
                </p>
                {index === 0 && (
                  <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent md:mt-2">
                    Current role
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-secondary">{experience.company}</p>
                <h3 className="mt-1 text-xl font-semibold">{experience.title}</h3>
                <p className="mt-2 max-w-3xl leading-7 text-secondary">
                  {experience.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/experience"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-tint px-6 py-3.5 font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent/10"
        >
          View full experience
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
