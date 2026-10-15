import { caseStudies, independentProjects } from "@/lib/constants";
import WorkCard from "@/components/work-card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const featuredWork = [
  independentProjects[0],
  ...caseStudies.slice(0, 1),
  ...independentProjects.filter((project) => project.slug === "citeleaf"),
];

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-20 border-y border-line bg-subtle py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Products I have helped take from complexity to clarity.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredWork.map((project, index) => (
            <WorkCard
              key={project.slug}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
        <Link href="/projects" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground hover:text-accent">
          Explore all work
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
