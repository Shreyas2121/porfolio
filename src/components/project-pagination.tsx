import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, independentProjects } from "@/lib/constants";
import { ReturnToWorkLink } from "@/components/work-index-navigation";
export default function ProjectPagination({ slug }: { slug: string }) {
  const work = [...caseStudies, ...independentProjects];
  const next = work[(work.findIndex(project => project.slug === slug) + 1) % work.length];
  return <nav aria-label="Continue exploring projects" className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
    <div>
      <ReturnToWorkLink href="/projects" className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent">
        Explore all work<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </ReturnToWorkLink>
      <Link href="/#contact" className="mt-2 flex min-h-11 w-fit items-center text-sm font-semibold text-secondary hover:text-accent">Discuss a project</Link>
    </div>
    <Link href={"/projects/" + next.slug} className="group flex min-h-11 flex-col justify-center rounded-xl border border-line p-5 transition hover:border-accent/40">
      <span className="text-xs font-semibold text-secondary">Next project · {"summary" in next ? "Professional work" : "Independent project"}</span>
      <span className="mt-2 flex items-center justify-between gap-4 font-semibold group-hover:text-accent">
        {next.title}<ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </span>
    </Link>
  </nav>;
}
