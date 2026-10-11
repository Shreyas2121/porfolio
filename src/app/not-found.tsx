import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-[75dvh] bg-page px-5 pb-16 pt-32 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found.
        </h1>
        <p className="mt-5 max-w-prose leading-7 text-secondary">
          This page may have moved. Explore the work index or return to the overview.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className="inline-flex min-h-11 items-center rounded-full bg-action px-5 py-3 font-semibold text-on-action">
            Explore all work
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-3 font-semibold">
            Back to overview
          </Link>
        </div>
      </div>
    </main>
  );
}
