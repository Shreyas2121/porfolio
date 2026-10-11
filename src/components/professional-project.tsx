import { ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/lib/constants";
import ProjectCover from "@/components/project-cover";
import ProjectMediaSection from "@/components/project-media";
import { CaseStudyLayout, CaseStudySection } from "@/components/case-study-layout";
import ProjectContext from "@/components/project-context";
import ProjectPagination from "@/components/project-pagination";
import { ReturnToWorkLink } from "@/components/work-index-navigation";

export default function ProfessionalProject({ project }: { project: CaseStudy }) {
  const hasArchitecture = project.media?.some(item => item.section === "architecture");
  const sections = [
    { id: "role", label: "My role" },
    { id: "challenge", label: "The challenge" },
    ...(project.media?.some(item => item.section === "gallery") ? [{ id: "gallery", label: "Product gallery" }] : []),
    ...(project.media?.some(item => item.section === "walkthrough") ? [{ id: "walkthrough", label: "Walkthrough" }] : []),
    ...(project.media?.some(item => item.section === "workflows") ? [{ id: "workflows", label: "Workflow figures" }] : []),
    ...(hasArchitecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(project.media?.some(item => item.section === "decisions") ? [{ id: "decisions", label: "Decision figures" }] : []),
    { id: "outcome", label: "Delivered outcome" },
    { id: "technology", label: "Technology" },
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
          <nav aria-label="Project breadcrumb"><ReturnToWorkLink href="/projects#professional" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:text-accent"><ArrowLeft className="h-4 w-4" aria-hidden="true" />All professional work</ReturnToWorkLink></nav>
          <p className="eyebrow mt-6">Professional case study</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
          <p className="mt-6 max-w-prose text-lg leading-8 text-body">{project.summary}</p>
          <p className="mt-6 max-w-prose text-sm leading-6 text-secondary">Sanitised professional work. Any illustrated architecture is reconstructed from the case study.</p>
          <ProjectContext project={project} />
        </div>
      </section>
      {project.cover && <section aria-label="Project overview visual" className="border-b border-line py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-8"><div className="overflow-hidden rounded-2xl border border-line"><ProjectCover cover={project.cover} sizes="(min-width: 896px) 832px, 100vw" /></div></div>
      </section>}
      <CaseStudyLayout sections={sections}>
        <CaseStudySection id="role" title="My role"><p className="max-w-prose text-lg leading-8 text-body">{project.role}</p></CaseStudySection>
        <CaseStudySection id="challenge" title="The challenge"><p className="max-w-prose text-lg leading-8 text-body">{project.challenge}</p></CaseStudySection>
        <ProjectMediaSection media={project.media} section="gallery" contained />
        <ProjectMediaSection media={project.media} section="walkthrough" contained />
        {project.media?.some(item => item.section === "workflows") && <CaseStudySection id="workflows" title="Workflow figures"><ProjectMediaSection media={project.media} section="workflows" contained /></CaseStudySection>}
        {hasArchitecture && <CaseStudySection id="architecture" title="Architecture"><ProjectMediaSection media={project.media} section="architecture" contained /></CaseStudySection>}
        {project.media?.some(item => item.section === "decisions") && <CaseStudySection id="decisions" title="Decision figures"><ProjectMediaSection media={project.media} section="decisions" contained /></CaseStudySection>}
        <CaseStudySection id="outcome" title="Delivered outcome"><p className="max-w-prose border-l-2 border-accent pl-5 text-lg leading-8 text-body">{project.outcome}</p></CaseStudySection>
        <CaseStudySection id="technology" title="Technology"><ul className="flex flex-wrap gap-x-6 gap-y-3 text-body">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></CaseStudySection>
        <ProjectPagination slug={project.slug} />
      </CaseStudyLayout>
    </main>
  );
}
