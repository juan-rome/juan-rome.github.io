"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";

/** Distance from the top of the viewport that counts as "reading this section". */
const ACTIVE_LINE = 100;

/**
 * Tracks which nav-linked section is currently being read, by scroll
 * position. Sections are checked in page order and the active one is the
 * last whose top has scrolled above ACTIVE_LINE — i.e. the section
 * currently occupying the reading position just under the sticky header.
 *
 * Call this once per page (not once per rendered nav) — it does its own
 * scroll/resize listening and DOM measurement, so mounting it more than
 * once duplicates that work for identical results.
 */
export function useActiveSection(): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => ({ href: link.href, el: document.querySelector(link.href) }))
      .filter((s): s is { href: string; el: Element } => s.el !== null);

    if (sections.length === 0) return;

    let frame = 0;
    const updateActive = () => {
      let current: string | null = null;
      for (const section of sections) {
        if (section.el.getBoundingClientRect().top <= ACTIVE_LINE) {
          current = section.href;
        }
      }
      setActiveHref(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return activeHref;
}
