"use client";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
const links = [
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Skills", "/#skills"],
  ["Contact", "/#contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 24);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    s();
    window.addEventListener("scroll", s, { passive: true });
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("scroll", s);
      window.removeEventListener("keydown", k);
    };
  }, []);
  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition " +
        (scrolled || open
          ? "border-b border-white/10 bg-slate-950/90 backdrop-blur-xl"
          : "")
      }
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300 text-sm font-black text-slate-950">
            SR
          </span>
          <span className="font-semibold">Shreyas Rasaikar</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <Link
              key={h}
              href={h}
              className="text-sm text-slate-300 hover:text-white"
            >
              {l}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold"
          >
            <Download className="h-4 w-4" />
            Resume
          </Link>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-slate-950 px-5 pb-6 md:hidden"
        >
          {links.map(([l, h]) => (
            <Link
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-slate-200"
            >
              {l}
            </Link>
          ))}
          <div className="my-2 px-3">
            <ThemeToggle />
          </div>
          <Link
            href="/resume"
            className="mt-2 flex justify-center rounded-lg bg-emerald-300 px-4 py-3 font-semibold text-slate-950"
          >
            View resume
          </Link>
        </div>
      )}
    </header>
  );
}
