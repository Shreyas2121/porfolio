import { WorkPreviewLink as Link } from "@/components/work-index-navigation";
import { ArrowUpRight, Github } from "lucide-react";
import type { CaseStudy, IndependentProject } from "@/lib/constants";
import ProjectCover from "@/components/project-cover";

type WorkCardProps = {
  project: CaseStudy | IndependentProject;
  featured?: boolean;
  sizes?: string;
};

export default function WorkCard({
  project,
  featured = false,
  sizes,
}: WorkCardProps) {
  const professional = "summary" in project;
  const href = "/projects/" + project.slug;
  const coverSizes = sizes ?? (featured
    ? "(min-width: 1152px) 544px, (min-width: 1024px) calc((100vw - 64px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
    : "(min-width: 1152px) 532px, (min-width: 768px) calc((100vw - 88px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)");

  return (
    <article
      aria-labelledby={`work-${project.slug}`}
      className={
        "flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface " +
        (featured ? "md:col-span-2 " + (project.cover ? "lg:grid lg:grid-cols-2" : "") : "")
      }
    >
      {project.cover && (
        <div className={featured ? "flex items-center bg-media" : undefined}>
          <ProjectCover
            cover={project.cover}
            sizes={coverSizes}
            link={{ href, label: `Read ${project.title} case study` }}
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-semibold text-accent">
          {professional ? "Professional work" : "Independent project"}
        </p>
        <h3 id={`work-${project.slug}`} className="mt-3 text-2xl font-semibold">
          <Link href={href} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-secondary">{project.context}</p>
        <p className="mt-4 leading-7 text-body">
          {professional ? project.summary : project.description}
        </p>
        <div className="mt-5 border-l-2 border-accent/40 pl-4">
          <p className="text-xs font-semibold text-secondary">
            {professional ? "Delivered outcome" : "Key capability"}
          </p>
          <p className="mt-1 font-medium leading-7 text-body">
            {professional ? project.outcome : project.highlights[0]}
          </p>
        </div>
        <ul aria-label="Selected technologies" className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((technology) => (
            <li key={technology} className="rounded-full bg-tint px-3 py-1 text-xs text-body">
              {technology}
            </li>
          ))}
        </ul>
        <footer className="mt-auto pt-6">
          <Link
            href={href}
            aria-label={`Read case study: ${project.title}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-action px-5 py-3 text-sm font-bold text-on-action"
          >
            Read case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {!professional && (
            <div className="mt-3 flex min-h-11 flex-wrap items-center gap-x-6 gap-y-2">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-body hover:text-accent">
                  Live demo
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-body hover:text-accent">
                <Github className="h-4 w-4" aria-hidden="true" />Source
              </a>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
