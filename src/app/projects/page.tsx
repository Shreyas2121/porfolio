import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WorkCard from "@/components/work-card";
import { WorkIndexScrollRestoration } from "@/components/work-index-navigation";
import { caseStudies, independentProjects } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects | Shreyas Rasaikar",
  description: "Professional and independent project case studies covering architecture, product workflows, engineering decisions and delivered outcomes.",
};

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-page text-foreground"
    >
      <WorkIndexScrollRestoration />
      <section className="relative isolate border-b border-line pb-12 pt-32 sm:pb-16 sm:pt-36">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:text-accent"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to overview</Link>
          <p className="eyebrow mt-6">All work</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">Products designed beyond the <span className="text-accent">happy path.</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body">Professional work and independent builds, with the ownership, architecture and engineering decisions behind each project.</p>
          <nav aria-label="Work categories" className="mt-8 flex flex-wrap gap-3">
            <a href="#independent" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 text-sm font-semibold hover:text-accent">Independent projects ({independentProjects.length})</a>
            <a href="#professional" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 text-sm font-semibold hover:text-accent">Professional work ({caseStudies.length})</a>
          </nav>
        </div>
      </section>
      <section id="independent" aria-labelledby="independent-title" className="scroll-mt-24 bg-subtle py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="independent-title" className="text-3xl font-semibold">Independent projects</h2>
          <p className="mt-3 max-w-2xl leading-7 text-secondary">Full-stack products built beyond client work, with demos and source code where available.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{independentProjects.map((project, index) => <WorkCard key={project.slug} project={project} featured={index === 0} />)}</div>
        </div>
      </section>
      <section id="professional" aria-labelledby="professional-title" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="professional-title" className="text-3xl font-semibold">Professional work</h2>
          <p className="mt-3 max-w-2xl leading-7 text-secondary">Sanitised case studies from client work, focused on my role and delivered outcomes.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{caseStudies.map((project, index) => <WorkCard key={project.slug} project={project} featured={index === 0} />)}</div>
        </div>
      </section>
    </main>
  );
}
