import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, FileText, MapPin } from "lucide-react";
import image from "../assests/image.avif";

const signals = [
  ["Nearly 4 years", "Product engineering"],
  ["Real time", "Data and WebSockets"],
  ["Full stack", "Data model to interface"],
];

export default function Hero() {
  return (
    <section className="relative isolate pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-8 pt-5 sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-12 lg:py-10">
        <div>
          <p className="eyebrow">Full-stack developer</p>
          <h1 className="mt-3 max-w-[18ch] text-[2rem] font-semibold leading-[1.12] tracking-[-0.045em] sm:text-4xl lg:text-[3.25rem] xl:text-6xl">
            I build real-time products from <span className="text-accent">data model to interface.</span>
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="#work" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-action px-5 py-3 font-bold text-on-action">
              See selected work<ArrowDownRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/resume" className="inline-flex min-h-11 items-center justify-center gap-2 px-1 py-2 text-sm font-semibold text-body transition hover:text-accent">
              <FileText className="h-5 w-5" aria-hidden="true" />View resume
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-7 text-body sm:text-lg">
            I&apos;m Shreyas, a full-stack developer with nearly four years of experience building B2B platforms and customer-facing products using TypeScript, React, NestJS, PostgreSQL and Redis.
          </p>
          <dl className="mt-5 grid max-w-2xl grid-cols-3 gap-3 border-t border-line pt-4">
            {signals.map(([value, label]) => <div key={value}>
              <dt className="text-sm font-semibold sm:text-base">{value}</dt>
              <dd className="mt-1 text-xs leading-5 text-secondary">{label}</dd>
            </div>)}
          </dl>
        </div>
        <figure className="relative flex w-full items-center gap-5 sm:gap-6 lg:mx-auto lg:block lg:max-w-xs xl:max-w-sm">
          <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface sm:w-36 lg:w-full">
            <Image src={image} alt="Shreyas Rasaikar" fill priority sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 640px) 144px, 112px" className="object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent lg:block" />
          </div>
          <figcaption className="hero-photo-caption max-w-60 text-body lg:absolute lg:inset-x-5 lg:bottom-5 lg:max-w-none lg:rounded-xl lg:bg-[#020617] lg:p-3">
            <p className="text-sm leading-6">Backend correctness. Clear interfaces. Reliable delivery.</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />Goa, India</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
