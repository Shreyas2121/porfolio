"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";

export default function ResumePreview({ src, viewUrl }: { src: string; viewUrl: string }) {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"loading" | "loaded" | "slow" | "failed">("loading");

  useEffect(() => {
    // Keep small or short screens out of nested document scrolling by default.
    setEnabled(window.matchMedia("(min-width: 768px) and (min-height: 600px)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || state !== "loading") return;
    const timer = window.setTimeout(() => setState("slow"), 12000);
    return () => window.clearTimeout(timer);
  }, [enabled, state]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <FileText className="h-4 w-4 text-accent" aria-hidden="true" />
          Resume preview
        </h2>
        <a href={viewUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4">
          Open resume in new tab
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {!enabled ? (
        <div className="p-6 sm:p-8">
          <p className="max-w-prose leading-7 text-secondary">
            Open the resume in a new tab for easier reading on a small screen,
            or load the embedded preview here.
          </p>
          <button type="button" onClick={() => setEnabled(true)} className="mt-5 inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 font-semibold transition hover:bg-tint">
            Load preview
          </button>
        </div>
      ) : (
        <>
          <p role="status" aria-live="polite" className="min-h-16 px-5 py-3 text-sm leading-6 text-secondary">
            {state === "loading" && "Loading resume preview…"}
            {state === "slow" && "The preview is taking longer than expected. You can open the resume in a new tab above."}
            {state === "loaded" && "If the document is blank or asks you to sign in, try opening it in a new tab above."}
            {state === "failed" && "The preview could not load. Open the resume in a new tab above."}
          </p>
          {state !== "failed" && (
            <iframe
              src={src}
              title="Shreyas Rasaikar resume preview"
              className="block h-[65dvh] w-full bg-media md:h-[70dvh]"
              onLoad={() => setState("loaded")}
              onError={() => setState("failed")}
            />
          )}
        </>
      )}
    </div>
  );
}
