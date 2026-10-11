import type { ReactNode } from "react";
import ProjectContents, { type ProjectSection } from "@/components/project-contents";

export function CaseStudyLayout({ sections, children }: { sections: ProjectSection[]; children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
    <ProjectContents sections={sections} />
    <div className="min-w-0">{children}</div>
  </div>;
}

export function CaseStudySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} tabIndex={-1} aria-labelledby={id + "-title"} className="scroll-mt-40 border-t border-line py-10 first:border-t-0 first:pt-0 sm:py-12 lg:scroll-mt-24">
    <h2 id={id + "-title"} className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>;
}
