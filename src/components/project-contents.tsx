"use client";

import { useEffect, useRef, useState } from "react";

export type ProjectSection = { id: string; label: string };

export default function ProjectContents({ sections }: { sections: ProjectSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const disclosure = useRef<HTMLDetailsElement>(null);
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      const offset = window.matchMedia("(min-width: 1024px)").matches ? 120 : 184;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [sections]);

  useEffect(() => {
    const container = rail.current;
    const link = container?.querySelector<HTMLElement>('nav[aria-label="Case study contents"] a[aria-current]');
    if (!container || !link?.getClientRects().length) return;
    const frame = container.getBoundingClientRect();
    const bounds = link.getBoundingClientRect();
    if (bounds.top < frame.top) container.scrollTop -= frame.top - bounds.top;
    if (bounds.bottom > frame.bottom) container.scrollTop += bounds.bottom - frame.bottom;
  }, [active]);

  const links = (mobile: boolean) => <nav aria-label={mobile ? "Case study sections" : "Case study contents"}>
    <ul className="space-y-1">
      {sections.map(section => <li key={section.id}>
        <a
          href={"#" + section.id}
          aria-current={active === section.id ? "location" : undefined}
          className={"flex min-h-11 items-center border-l-2 px-4 py-2 text-sm transition " + (active === section.id ? "border-accent font-semibold text-accent" : "border-transparent text-secondary hover:border-line hover:text-foreground")}
          onClick={() => {
            setActive(section.id);
            if (disclosure.current) disclosure.current.open = false;
            window.requestAnimationFrame(() => document.getElementById(section.id)?.focus({ preventScroll: true }));
          }}
        >{section.label}</a>
      </li>)}
    </ul>
  </nav>;

  return <aside ref={rail} className="sticky top-20 z-30 mb-8 max-h-[calc(100dvh_-_8rem)] self-start overflow-y-auto lg:top-24 lg:mb-0">
    <div className="hidden lg:block">
      <p className="mb-4 text-sm font-semibold">On this page</p>
      {links(false)}
    </div>
    <details ref={disclosure} className="rounded-xl border border-line bg-surface lg:hidden">
      <summary className="cursor-pointer px-4 py-3 font-semibold">On this page<span className="mt-1 block truncate text-xs font-normal text-secondary">{sections.find(section => section.id === active)?.label}</span></summary>
      <div className="border-t border-line p-2">{links(true)}</div>
    </details>
  </aside>;
}
