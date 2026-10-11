import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/constants";
import WorkCard from "@/components/work-card";

export default function ProfessionalWork() {
  return (
    <section id="professional-work" className="scroll-mt-24 border-y border-line bg-subtle py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-3xl font-semibold">Professional case studies</h2>
        <p className="mt-3 max-w-2xl leading-7 text-secondary">Explore the systems behind the experience, including ownership, technical decisions and delivered outcomes.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{caseStudies.map(project => <WorkCard key={project.slug} project={project} />)}</div>
        <Link href="/projects" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-accent">Explore all work<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
