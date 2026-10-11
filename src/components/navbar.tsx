"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Skills", "/#skills"],
  ["Contact", "/#contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const desktop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (!breakpoint.matches) return;
      const focused = document.activeElement;
      if (focused === toggle.current || (focused && mobileMenu.current?.contains(focused))) {
        desktop.current?.querySelector<HTMLElement>("a")?.focus();
      }
      setOpen(false);
    };
    document.addEventListener("keydown", escape);
    breakpoint.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      breakpoint.removeEventListener("change", resize);
    };
  }, [open]);

  const current = (href: string): "page" | "location" | undefined => {
    if (href.includes("#")) {
      return pathname === "/" && hash === href.slice(1) ? "location" : undefined;
    }
    return pathname === href || pathname.startsWith(href + "/") ? "page" : undefined;
  };

  function selectLink(href: string) {
    setOpen(false);
    const [route, anchor] = href.split("#");
    if (route === pathname) {
      setHash(anchor ? "#" + anchor : "");
      window.requestAnimationFrame(() => {
        const target = document.getElementById(anchor || "main-content");
        target?.focus({ preventScroll: true });
      });
    }
  }

  const linkStyle = (href: string) => current(href)
    ? "font-semibold text-accent underline decoration-2 underline-offset-8"
    : "text-body transition hover:text-accent";

  return (
    <header className={"fixed inset-x-0 top-0 z-50 transition " + (scrolled || open ? "border-b border-line bg-page/90 backdrop-blur-xl" : "")}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8" aria-label="Main navigation">
        <Link href="/" onClick={() => selectLink("/")} aria-current={pathname === "/" ? "page" : undefined} className="flex min-h-11 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-action text-sm font-black text-on-action">SR</span>
          <span className="text-sm font-semibold sm:text-base">Shreyas Rasaikar</span>
        </Link>
        <div ref={desktop} className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => selectLink(href)} aria-current={current(href)} className={"inline-flex min-h-11 items-center text-sm " + linkStyle(href)}>{label}</Link>
          ))}
          <Link href="/resume" onClick={() => selectLink("/resume")} aria-current={current("/resume")} className={"inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold " + linkStyle("/resume")}>
            <FileText className="h-4 w-4" aria-hidden="true" />Resume
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <button ref={toggle} type="button" className="grid h-11 w-11 place-items-center rounded-lg md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <div ref={mobileMenu} id="mobile-menu" hidden={!open} className="max-h-[calc(100dvh_-_5rem)] overflow-y-auto border-t border-line bg-page px-5 pb-6 md:hidden">
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => selectLink(href)} aria-current={current(href)} className={"flex min-h-11 items-center rounded-lg px-3 py-3 " + linkStyle(href)}>{label}</Link>
          ))}
          <Link href="/resume" onClick={() => selectLink("/resume")} aria-current={current("/resume")} className={"mt-2 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-action px-4 py-3 font-semibold text-on-action " + (current("/resume") ? "underline decoration-2 underline-offset-4" : "")}>
            <FileText className="h-4 w-4" aria-hidden="true" />View resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
