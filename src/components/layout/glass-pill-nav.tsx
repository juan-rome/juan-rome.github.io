"use client";

import { useEffect, useRef } from "react";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * The desktop nav: a floating glass pill with a magnetic cursor glow and
 * an accent-colored indicator that slides to whichever link matches
 * activeHref (from useActiveSection, tracked by scroll position — not a
 * click handler, so it stays in sync even when the user scrolls past a
 * section without clicking its link). Hidden below lg, where the full
 * link list would collide with the name badge; the mobile hamburger +
 * glass sheet in Nav takes over there instead.
 */
export function GlassPillNav({
  activeHref,
  condensed,
}: {
  activeHref: string | null;
  condensed: boolean;
}) {
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    function handleMove(e: PointerEvent) {
      const rect = pill!.getBoundingClientRect();
      pill!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      pill!.style.setProperty("--my", `${e.clientY - rect.top}px`);
      pill!.classList.add("is-hovering");
    }
    function handleLeave() {
      pill!.classList.remove("is-hovering");
    }
    pill.addEventListener("pointermove", handleMove);
    pill.addEventListener("pointerleave", handleLeave);
    return () => {
      pill.removeEventListener("pointermove", handleMove);
      pill.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    function moveIndicator() {
      const indicator = indicatorRef.current;
      const activeLink = activeHref ? linkRefs.current[activeHref] : null;
      if (!indicator) return;
      if (!activeLink) {
        indicator.style.opacity = "0";
        indicator.style.width = "0";
        return;
      }
      indicator.style.width = `${activeLink.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
      indicator.style.opacity = "1";
    }
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [activeHref]);

  return (
    <nav
      aria-label="Primary"
      ref={pillRef}
      className={cn(
        "glass-surface glass-pill hidden items-center gap-0.5 rounded-full p-1.5 transition-transform duration-[400ms] ease-out lg:flex",
        condensed && "is-condensed"
      )}
    >
      <span
        ref={indicatorRef}
        className="glass-pill-indicator bg-accent absolute top-1.5 bottom-1.5 left-0 z-[1] w-0 rounded-full opacity-0"
      />
      {navLinks.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <a
            key={link.href}
            ref={(el) => {
              linkRefs.current[link.href] = el;
            }}
            href={link.href}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "relative z-[2] rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors",
              isActive ? "text-white" : "text-muted hover:text-foreground"
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
