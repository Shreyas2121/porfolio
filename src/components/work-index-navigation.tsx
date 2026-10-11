"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

const positionKey = "portfolio:work-index-position";
const restoreKey = "portfolio:restore-work-index";
type IndexPosition = { url: string; y: number; savedAt: number };
type WorkLinkProps = ComponentProps<typeof Link>;

function readPosition(): IndexPosition | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(positionKey) ?? "null");
    if (value && /^\/projects(?:#(?:professional|independent))?$/.test(value.url) &&
      Number.isFinite(value.y) && value.y >= 0 && Number.isFinite(value.savedAt) &&
      Date.now() - value.savedAt < 30 * 60 * 1000) return value;
  } catch { /* Navigation remains usable without session storage. */ }
  return null;
}
function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey &&
    !event.ctrlKey && !event.shiftKey && !event.altKey && event.currentTarget.target !== "_blank";
}
export function WorkPreviewLink({ onClick, ...props }: WorkLinkProps) {
  return <Link {...props} onClick={event => {
    onClick?.(event);
    if (!isPlainClick(event) || location.pathname !== "/projects") return;
    try {
      sessionStorage.setItem(positionKey, JSON.stringify({
        url: location.pathname + location.hash, y: window.scrollY, savedAt: Date.now(),
      } satisfies IndexPosition));
    } catch { /* The case-study link still works when storage is unavailable. */ }
  }} />;
}
export function ReturnToWorkLink({ onClick, ...props }: WorkLinkProps) {
  const router = useRouter();
  return <Link {...props} onClick={event => {
    onClick?.(event);
    if (!isPlainClick(event)) return;
    const position = readPosition();
    if (!position) return;
    try { sessionStorage.setItem(restoreKey, JSON.stringify(position)); } catch { return; }
    event.preventDefault();
    router.push(position.url, { scroll: false });
  }} />;
}
export function WorkIndexScrollRestoration() {
  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    try {
      const pending = sessionStorage.getItem(restoreKey);
      if (!pending) { sessionStorage.removeItem(positionKey); return; }
      const position = readPosition();
      if (!position || JSON.stringify(position) !== pending) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          window.scrollTo({ top: position.y, behavior: "instant" });
          sessionStorage.removeItem(restoreKey);
        });
      });
    } catch { /* Default framework navigation remains available. */ }
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, []);
  return null;
}
