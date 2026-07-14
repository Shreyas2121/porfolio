import { experiences } from "@/lib/constants";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

export default function Experience() {
  return <section id="experience" className="scroll-mt-20 py-24"><div className="mx-auto max-w-6xl px-5 sm:px-8">
    <p className="eyebrow">Experience</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Four years of learning by shipping.</h2>
    <div className="mt-12 border-t border-white/10">{experiences.map((exp,index)=><article key={exp.company} className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-[.38fr_1fr]">
      <div><p className="font-semibold text-emerald-300">{exp.period}</p><p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-4 w-4"/>{exp.location}</p></div>
      <div><p className="text-sm text-slate-400">{exp.company}</p><h3 className="mt-1 text-2xl font-semibold">{exp.title}</h3><p className="mt-4 max-w-3xl leading-7 text-slate-400">{exp.summary}</p><ul className="mt-6 space-y-3">{exp.achievements.map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300"/>{item}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2">{exp.stack.map(item=><span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">{item}</span>)}</div>{index===0&&<span className="mt-5 inline-flex rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">Current role</span>}</div>
    </article>)}</div>
    <div className="mt-10 flex justify-center"><Link href="/experience" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:border-emerald-300/40 hover:bg-emerald-300/10">View full experience<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link></div>
  </div></section>;
}
