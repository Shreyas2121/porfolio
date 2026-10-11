import { MediaImage } from "@/components/project-media-viewer";
import type { ProjectCover as Cover } from "@/lib/constants";
import { WorkPreviewLink } from "@/components/work-index-navigation";

type ProjectCoverProps = {
  cover: Cover;
  sizes: string;
  link?: { href: string; label: string };
};

export default function ProjectCover({ cover, sizes, link }: ProjectCoverProps) {
  return (
    <figure className="w-full overflow-hidden border-b border-line">
      <div className="relative">
        <MediaImage key={cover.src} image={cover} sizes={sizes} linkOnError={false} />
        {link && (
          <WorkPreviewLink
            href={link.href}
            aria-label={link.label}
            className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
          />
        )}
      </div>
      <figcaption className="border-t border-line bg-surface px-4 py-3 text-xs leading-5 text-secondary">
        {cover.caption}
      </figcaption>
    </figure>
  );
}
