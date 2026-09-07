"use client";

import { useEffect, useRef, useState } from "react";
import { NavLinks } from "@/components/layout/nav-links";
import { GlassPillNav } from "@/components/layout/glass-pill-nav";
import { useActiveSection } from "@/hooks/use-active-section";

/** Desktop glass pill + mobile hamburger/glass-sheet menu, sharing one
 *  active-section tracker. */
export function Nav({ condensed }: { condensed: boolean }) {
  const activeHref = useActiveSection();
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!sheetOpen) return;
      const target = event.target as Node;
      if (sheetRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setSheetOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sheetOpen]);

  return (
    <>
      <GlassPillNav activeHref={activeHref} condensed={condensed} />
      <div className="relative lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((open) => !open)}
          className="glass-surface text-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {sheetOpen ? (
          <nav
            aria-label="Primary"
            ref={sheetRef}
            className="glass-sheet-surface absolute top-full right-0 z-50 mt-2 flex w-56 flex-col gap-0.5 rounded-2xl p-1.5"
          >
            <NavLinks
              activeHref={activeHref}
              linkClassName="rounded-xl px-3.5 py-2.5 text-[0.9rem] hover:bg-white/[0.06]"
              onNavigate={() => setSheetOpen(false)}
            />
          </nav>
        ) : null}
      </div>
    </>
  );
}
