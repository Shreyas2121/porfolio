import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import {
  resumeDownloadUrl,
  resumePreviewUrl,
  resumeViewUrl,
} from "@/lib/resume";
import ResumePreview from "@/components/resume-preview";

export const metadata: Metadata = {
  title: "Resume | Shreyas Rasaikar",
  description:
    "View or download the latest resume of full-stack developer Shreyas Rasaikar.",
};

export default function ResumePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-page text-foreground"
    >
      <section className="relative isolate border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to overview
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Latest resume</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Experience at a glance.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-body">
                View my latest resume or download a PDF to keep.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={resumeViewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-action px-5 py-3 font-bold text-on-action"
              >
                Open resume
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={resumeDownloadUrl}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-tint px-5 py-3 font-semibold text-foreground"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ResumePreview src={resumePreviewUrl} viewUrl={resumeViewUrl} />

          <p className="mt-5 text-center text-sm text-secondary">
            If the embedded viewer does not load,{" "}
            <a
              href={resumeViewUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent underline underline-offset-4"
            >
              open the resume in Google Drive
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
