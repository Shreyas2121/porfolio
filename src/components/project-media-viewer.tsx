"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ProjectCover, ProjectDiagram, ProjectScreenshot, ProjectVideo } from "@/lib/constants";
import { getYouTubeLinks } from "@/lib/youtube";

const control = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-tint disabled:opacity-40";

export function MediaImage({ image, sizes, linkOnError = true }: { image: ProjectCover; sizes: string; linkOnError?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative bg-media" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      {!failed && <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-contain" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
      {failed ? (
        <div className={"absolute inset-0 flex flex-col items-center gap-3 p-5 text-center text-media-ink " + (linkOnError ? "justify-center" : "justify-start")}>
          <p role="status">This visual could not be loaded.</p>
          {linkOnError && <a href={image.src} className="inline-flex min-h-11 items-center underline">Open the original image</a>}
        </div>
      ) : !loaded ? (
        <p role="status" className="absolute bottom-3 left-3 rounded bg-white px-3 py-1 text-sm text-media-ink">Loading visual…</p>
      ) : null}
    </div>
  );
}

export function ProjectMediaFigure({ image, explanation, expandedSrc, expandedImage, legend }: {
  image: ProjectCover;
  explanation?: string;
  expandedSrc?: string;
  expandedImage?: ProjectDiagram["expanded"];
  legend?: ProjectDiagram["legend"];
}) {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [viewerWidth, setViewerWidth] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const openerButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const explanationId = useId();

  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const element = dialog.current;
    const opener = openerButton.current ?? document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded || !viewport.current) return;
    const observer = new ResizeObserver(entries => setViewerWidth(entries[0].contentRect.width));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <MediaImage key={image.src} image={image} sizes="(min-width: 1280px) 960px, (min-width: 1024px) calc(100vw - 320px), calc(100vw - 40px)" />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 p-4 text-body">
        <p className="text-sm leading-6">{image.caption}</p>
        <button type="button" className={control} onClick={event => { openerButton.current = event.currentTarget; setZoom(1); setViewerWidth(0); setExpanded(true); }} aria-haspopup="dialog" aria-label={`Enlarge ${image.caption}`}>Enlarge</button>
      </figcaption>
      {explanation && <p id={explanationId} className="max-w-[70ch] px-4 pb-5 leading-7 text-secondary">{explanation}</p>}
      {!!legend?.length && <dl aria-label="Diagram legend" className="grid gap-3 border-t border-line p-4 sm:grid-cols-2">{legend.map(entry => <div key={entry.symbol}><dt className="text-sm font-semibold">{entry.symbol}</dt><dd className="mt-1 text-sm leading-6 text-secondary">{entry.meaning}</dd></div>)}</dl>}
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        aria-describedby={explanation ? explanationId : undefined}
        className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-6xl overflow-hidden rounded-2xl border border-line bg-page p-0 text-foreground backdrop:bg-black/70"
        onClose={event => { if (!event.currentTarget.open) setExpanded(false); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'))
            .filter(element => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setExpanded(false);
        }}
      >
        {expanded && <div className="flex max-h-[90dvh] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line p-3 sm:p-4">
            <h2 id={titleId} className="text-lg font-semibold">{image.caption}</h2>
            <button type="button" ref={closeButton} className={control} onClick={() => setExpanded(false)}>Close visual</button>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 p-3" role="group" aria-label="Image zoom controls">
            <button type="button" className={control} disabled={zoom <= 1} onClick={() => setZoom(value => Math.max(1, value - 0.5))} aria-label="Zoom out">−</button>
            <span className="min-w-14 text-center text-sm" role="status">{Math.round(zoom * 100)}%</span>
            <button type="button" className={control} disabled={zoom >= 3} onClick={() => setZoom(value => Math.min(3, value + 0.5))} aria-label="Zoom in">+</button>
            <button type="button" className={control} onClick={() => setZoom(1)}>Reset zoom</button>
          </div>
          <div ref={viewport} className="min-h-0 flex-1 overflow-auto overscroll-contain focus-visible:outline-2 focus-visible:outline-accent" role="region" tabIndex={0} aria-label="Expanded visual; scroll to explore when zoomed">
            <div className="shrink-0" style={{ width: viewerWidth ? viewerWidth * zoom : "100%" }}>
              <MediaImage key={expandedImage?.src || expandedSrc || image.src} image={{ ...image, ...expandedImage, src: expandedImage?.src || expandedSrc || image.src }} sizes="100vw" />
            </div>
            {explanation && <p className="max-w-[70ch] px-4 py-3 text-sm leading-6 text-secondary">{explanation}</p>}
          </div>
        </div>}
      </dialog>
    </figure>
  );
}

export function ProjectGallery({ images }: { images: ProjectScreenshot[] }) {
  const [selected, setSelected] = useState(0);
  const image = images[selected];
  if (!image) return null;
  return <div className="space-y-4 focus-visible:outline-2 focus-visible:outline-accent" role="region" aria-label="Project screenshots" tabIndex={images.length > 1 ? 0 : undefined} onKeyDown={event => {
    if ((event.target as HTMLElement).closest("dialog")) return;
    const next = event.key === "ArrowRight" ? Math.min(selected + 1, images.length - 1)
      : event.key === "ArrowLeft" ? Math.max(selected - 1, 0)
      : event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : null;
    if (next !== null) { event.preventDefault(); setSelected(next); }
  }}>
    <ProjectMediaFigure key={image.id} image={image} />
    {images.length > 1 && <>
      <div className="grid grid-cols-2 items-center gap-3 sm:flex sm:justify-between">
        <button type="button" className={control} disabled={selected === 0} onClick={() => setSelected(value => value - 1)}>Previous image</button>
        <p className="order-first col-span-2 text-center text-sm text-secondary sm:order-none" role="status">{selected + 1} / {images.length}</p>
        <button type="button" className={control} disabled={selected === images.length - 1} onClick={() => setSelected(value => value + 1)}>Next image</button>
      </div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Choose a screenshot">
        {images.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-label={`Show screenshot ${index + 1}: ${item.caption}`} onClick={() => setSelected(index)} className={`w-28 overflow-hidden rounded-lg border-2 p-1 ${selected === index ? "border-accent" : "border-line"}`}>
          <Image src={item.src} alt="" width={112} height={70} className="aspect-[16/10] w-full bg-media object-contain" />
          <span className="block py-1 text-sm">{index + 1}</span>
        </button>)}
      </div>
    </>}
  </div>;
}

export function ProjectDiagramFigure({ diagram }: { diagram: ProjectDiagram }) {
  return <ProjectMediaFigure image={diagram} explanation={diagram.explanation} expandedSrc={diagram.expandedSrc} expandedImage={diagram.expanded} legend={diagram.legend} />;
}

export function ProjectWalkthrough({ video }: { video: ProjectVideo }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  const captionId = useId();
  const links = getYouTubeLinks(video.youtubeId);
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  return <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
    <div className="relative aspect-video min-h-[200px] bg-slate-950">
      {playing ? <iframe
        ref={player}
        src={links.embed}
        title={`${video.title} — YouTube video`}
        aria-describedby={captionId}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      /> : <>
        <div className="absolute inset-0 flex items-center"><div className="w-full">
          <MediaImage image={{ src: video.poster, alt: `${video.title} video poster`, width: video.width, height: video.height, caption: video.caption }} sizes="(min-width: 1280px) 960px, (min-width: 1024px) calc(100vw - 320px), calc(100vw - 40px)" linkOnError={false} />
        </div></div>
        <button type="button" className="absolute inset-0 flex items-center justify-center" onClick={() => setPlaying(true)}>
          <span className="inline-flex items-center gap-3 rounded-full bg-page px-5 py-4 font-semibold text-foreground shadow-lg">
            <Play className="h-5 w-5 shrink-0 fill-current text-accent" aria-hidden="true" />
            <span>Play walkthrough<span className="mt-0.5 block text-xs font-normal text-secondary">YouTube · {video.duration}</span><span className="sr-only">: {video.title}</span></span>
          </span>
        </button>
      </>}
    </div>
    <figcaption id={captionId} className="space-y-3 p-5">
      <h3 className="text-xl font-semibold">{video.title} <span className="text-sm font-normal text-secondary">({video.duration})</span></h3>
      <p className="leading-7 text-secondary">{video.caption}</p>
      <div className="flex flex-wrap gap-5 text-sm">
        <a href={links.watch} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent">Watch on YouTube<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        {video.transcript && <a href={video.transcript} className="inline-flex min-h-11 items-center text-accent underline">Read transcript</a>}
      </div>
      {video.steps.length > 0 && <div><h4 className="font-semibold">Written walkthrough</h4><ol className="mt-3 list-decimal space-y-2 pl-5 text-secondary">{video.steps.map(step => <li key={step} className="leading-7">{step}</li>)}</ol></div>}
    </figcaption>
  </figure>;
}
