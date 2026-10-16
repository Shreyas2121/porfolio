"use client";

import { Check, Moon, Sparkles, Sun, Sunset } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const themes = [
  { id: "light", name: "Light", description: "Clean & classic", icon: Sun, colors: ["#f8fafc", "#047857"] },
  { id: "dark", name: "Dark", description: "After hours", icon: Moon, colors: ["#0f172a", "#6ee7b7"] },
  { id: "dopamine", name: "Dopamine", description: "A little extra", icon: Sparkles, colors: ["#ede5ff", "#c5f542"] },
  { id: "sand", name: "Sand", description: "Slow Sunday energy", icon: Sunset, colors: ["#f6f0e4", "#9c432b"] },
] as const;
type Theme = (typeof themes)[number]["id"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (themes.some(option => option.id === saved)) setTheme(saved as Theme);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function selectTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next === "dark" ? "dark" : "light";
    setTheme(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch { /* Theme selection still works when storage is unavailable. */ }
    setOpen(false);
    trigger.current?.focus();
  }

  const Icon = themes.find(option => option.id === theme)!.icon;

  return (
    <div ref={container} className="relative" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(!open)}
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-body transition hover:bg-tint"
        aria-label="Choose theme"
        aria-expanded={open}
        aria-controls="theme-picker"
        title="Choose theme"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </button>
      <div id="theme-picker" hidden={!open} className="absolute right-0 top-full z-10 mt-3 w-60 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-black/10" role="group" aria-label="Color theme">
        <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-widest text-secondary">Pick your mood</p>
        {themes.map(option => (
          <button key={option.id} type="button" aria-pressed={theme === option.id} onClick={() => selectTheme(option.id)} className="flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-body transition hover:bg-tint aria-pressed:bg-subtle">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line" style={{ backgroundColor: option.colors[0], color: option.id === "dark" ? "#6ee7b7" : "#42235f" }}>
              <option.icon className="h-4 w-4" aria-hidden="true" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-surface" style={{ backgroundColor: option.colors[1] }} />
            </span>
            <span className="flex-1"><span className="block text-sm font-semibold text-foreground">{option.name}</span><span className="block text-xs text-secondary">{option.description}</span></span>
            {theme === option.id && <Check className="h-4 w-4 text-accent" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
