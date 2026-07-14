import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileText,
} from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  resumeDownloadUrl,
  resumePreviewUrl,
  resumeViewUrl,
} from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume | Shreyas Rasaikar",
  description:
    "View or download the latest resume of full-stack developer Shreyas Rasaikar.",
};

export default function ResumePage() {
  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <Navbar />

      <section className="relative isolate border-b border-white/5 pb-14 pt-36">
        <div className="absolute inset-0 -z-10 grid-glow" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to overview
          </Link>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Latest resume</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
                Experience at a glance.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                The document below always displays the latest version uploaded
                to the same Google Drive file.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={resumeDownloadUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3 font-bold text-slate-950"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
              <a
                href={resumeViewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white"
              >
                Open in new tab
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/10">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-sm text-slate-400">
              <FileText className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              Shreyas Rasaikar — Resume
            </div>
            <iframe
              src={resumePreviewUrl}
              title="Shreyas Rasaikar resume preview"
              className="h-[78vh] min-h-[560px] w-full bg-white"
              allow="autoplay"
            />
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            If the embedded viewer does not load,{" "}
            <a
              href={resumeViewUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-300 hover:underline"
            >
              open the resume in Google Drive
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
