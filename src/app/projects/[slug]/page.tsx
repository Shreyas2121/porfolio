import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import ProjectCover from "@/components/project-cover";
import ProjectMediaSection from "@/components/project-media";
import ProfessionalProject from "@/components/professional-project";
import { CaseStudyLayout, CaseStudySection } from "@/components/case-study-layout";
import { caseStudies, independentProjects } from "@/lib/constants";
import ProjectContext from "@/components/project-context";
import ProjectPagination from "@/components/project-pagination";
import { ReturnToWorkLink } from "@/components/work-index-navigation";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...caseStudies, ...independentProjects].map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = [...caseStudies, ...independentProjects].find(item => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title + " Case Study | Shreyas Rasaikar",
    description: "summary" in project ? project.summary : project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const professional = caseStudies.find(item => item.slug === slug);
  if (professional) return <ProfessionalProject project={professional} />;
  const project = independentProjects.find(item => item.slug === slug);
  if (!project) notFound();

  const sections = [
    { id: "overview", label: "Overview" },
    ...(project.media?.some(item => item.section === "gallery") ? [{ id: "gallery", label: "Product gallery" }] : []),
    ...(project.media?.some(item => item.section === "walkthrough") ? [{ id: "walkthrough", label: "Walkthrough" }] : []),
    { id: "workflows", label: "Product workflows" },
    { id: "architecture", label: "Architecture" },
    { id: "decisions", label: "Engineering decisions" },
    { id: "technology", label: "Technology" },
    ...(project.evidence?.length ? [{ id: "evidence", label: "Verification and evidence" }] : []),
    { id: "constraints", label: "Current limitations" },
  ];

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-page text-foreground"
    >
      <section className="relative isolate border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav aria-label="Project breadcrumb"><ReturnToWorkLink href="/projects#independent" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:text-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />All independent projects
          </ReturnToWorkLink></nav>
          <p className="eyebrow mt-6">{project.context}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
          <p className="mt-6 max-w-prose text-lg leading-8 text-body">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-action px-5 py-3 font-bold text-on-action">
              Open live demo<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>}
            <a href={project.repository} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 px-2 py-3 font-semibold hover:text-accent">
              <Github className="h-4 w-4" aria-hidden="true" />View source
            </a>
          </div>
          <ProjectContext project={project} />
        </div>
      </section>

      {project.cover && <section className="border-b border-line py-10 sm:py-12" aria-label="Project overview visual">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-line">
            <ProjectCover cover={project.cover} sizes="(min-width: 896px) 832px, 100vw" />
          </div>
        </div>
      </section>}

      <CaseStudyLayout sections={sections}>
        <CaseStudySection id="overview" title="Overview">
          <div className="max-w-[70ch] space-y-8 text-lg">
            <div><h3 className="text-lg font-semibold">The problem</h3><p className="mt-3 text-lg leading-8 text-body">{project.problem}</p></div>
            <div><h3 className="text-lg font-semibold">The solution</h3><p className="mt-3 text-lg leading-8 text-body">{project.solution}</p></div>
          </div>
        </CaseStudySection>
        <ProjectMediaSection media={project.media} section="gallery" contained />
        <ProjectMediaSection media={project.media} section="walkthrough" contained />
        <CaseStudySection id="workflows" title="Product workflows">
          <p className="text-secondary">One product, different responsibilities.</p>
          <ProjectMediaSection media={project.media} section="workflows" contained />
          <div className={"mt-6 grid gap-8 " + (project.users.length > 1 ? "sm:grid-cols-2 " : "max-w-prose ") + (project.users.length > 2 ? "xl:grid-cols-3" : "")}>
            {project.users.map(user => <article key={user.role} className="border-l-2 border-accent/30 pl-5">
              <h3 className="text-lg font-semibold">{user.role}</h3>
              <p className="mt-3 leading-7 text-secondary">{user.capabilities}</p>
            </article>)}
          </div>
          {project.workflows?.length ? <div className="mt-10 max-w-[70ch] space-y-8">
            {project.workflows.map(workflow => <article key={workflow.title}>
              <h3 className="text-lg font-semibold">{workflow.title}</h3>
              <p className="mt-3 leading-7 text-body">{workflow.description}</p>
            </article>)}
          </div> : null}
        </CaseStudySection>
        <CaseStudySection id="architecture" title="Architecture">
          <p className="text-secondary">Clear boundaries across the stack.</p>
          <ProjectMediaSection media={project.media} section="architecture" contained />
          <div className="mt-8 divide-y divide-line">
            {project.architecture.map((layer, index) => <article key={layer.layer} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[.35fr_1fr] sm:gap-6">
              <h3 className="text-lg font-semibold"><span className="mr-2 text-sm font-normal text-secondary">0{index + 1}</span>{layer.layer}</h3>
              <div><p className="max-w-prose leading-7 text-body">{layer.details}</p><p className="mt-3 text-sm leading-6 text-secondary">{layer.technologies.join(" · ")}</p></div>
            </article>)}
          </div>
        </CaseStudySection>
        <CaseStudySection id="decisions" title="Engineering decisions">
          <ProjectMediaSection media={project.media} section="decisions" contained />
          <div className="max-w-[70ch] space-y-8 text-lg">
            {project.decisions.map(decision => <article key={decision.title}>
              <h3 className="text-lg font-semibold">{decision.title}</h3>
              <p className="mt-3 leading-7 text-body">{decision.description}</p>
            </article>)}
          </div>
        </CaseStudySection>
        <CaseStudySection id="technology" title="Technology">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-body">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>
        {project.evidence?.length ? <CaseStudySection id="evidence" title="Verification and evidence">
          <div className="max-w-[70ch] space-y-8">
            {project.evidence.map(item => <article key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-body">{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-accent">
                {item.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>)}
          </div>
        </CaseStudySection> : null}
        <CaseStudySection id="constraints" title="Current limitations">
          <ul className="max-w-prose list-disc space-y-3 rounded-xl border border-line bg-surface py-6 pl-10 pr-6 text-secondary">
            {project.limitations.map(item => <li key={item} className="leading-7">{item}</li>)}
          </ul>
        </CaseStudySection>
        <ProjectPagination slug={project.slug} />
      </CaseStudyLayout>
    </main>
  );
}
