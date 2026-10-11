import type { ProjectMedia, ProjectScreenshot, ProjectVideo } from "@/lib/constants";
import { ProjectDiagramFigure, ProjectGallery, ProjectMediaFigure, ProjectWalkthrough } from "@/components/project-media-viewer";

export default function ProjectMediaSection({ media = [], section, contained = false }: {
  media?: ProjectMedia[];
  section: ProjectMedia["section"];
  contained?: boolean;
}) {
  const items = media.map((item, index) => ({ item, order: item.order ?? index }))
    .filter(({ item }) => item.section === section)
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);
  if (!items.length) return null;
  if (section === "gallery") {
    return <section id="gallery" tabIndex={-1} className="scroll-mt-40 border-t border-line py-10 sm:py-12 lg:scroll-mt-24" aria-labelledby="gallery-title">
      <div className={contained ? "" : "mx-auto max-w-6xl px-5 sm:px-8"}>
        <h2 id="gallery-title" className="mb-6 text-3xl font-semibold">Product gallery</h2>
        <ProjectGallery images={items.filter((item): item is ProjectScreenshot => item.type === "screenshot")} />
      </div>
    </section>;
  }
  if (section === "walkthrough") {
    return <section id="walkthrough" tabIndex={-1} className="scroll-mt-40 border-t border-line py-10 sm:py-12 lg:scroll-mt-24" aria-labelledby="walkthrough-title">
      <div className={contained ? "space-y-6" : "mx-auto max-w-6xl space-y-6 px-5 sm:px-8"}>
        <h2 id="walkthrough-title" className="text-3xl font-semibold">Product walkthrough</h2>
        {items.filter((item): item is ProjectVideo => item.type === "video").map(video => <ProjectWalkthrough key={video.id} video={video} />)}
      </div>
    </section>;
  }
  return <div className="mt-8 space-y-6">
    {items.map(item => item.type === "diagram"
      ? <ProjectDiagramFigure key={item.id} diagram={item} />
      : item.type === "screenshot" ? <ProjectMediaFigure key={item.id} image={item} /> : null)}
  </div>;
}
