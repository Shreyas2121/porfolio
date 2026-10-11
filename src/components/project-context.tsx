import type { CaseStudy, IndependentProject } from "@/lib/constants";
export default function ProjectContext({ project }: { project: CaseStudy | IndependentProject }) {
  const items = [
    ["Work type", "summary" in project ? "Professional case study" : "Independent project"],
    ["Context", project.context],
    ["Core stack", project.stack.slice(0, 3).join(" · ")],
  ];
  return <dl aria-label="Project context" className="mt-8 grid gap-5 border-t border-line pt-5 sm:grid-cols-3 sm:gap-8">
    {items.map(([label, value]) => <div key={label}>
      <dt className="text-xs font-semibold text-secondary">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-body">{value}</dd>
    </div>)}
  </dl>;
}
