"use client";

import { useRef } from "react";
import { NavLinks } from "@/components/layout/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";

/** Desktop nav + mobile disclosure menu, sharing one active-section tracker. */
export function Nav() {
  const activeHref = useActiveSection();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <>
      <nav aria-label="Primary" className="hidden gap-1 sm:flex">
        <NavLinks
          activeHref={activeHref}
          linkClassName="rounded-full px-3 py-2 text-sm"
        />
      </nav>
      <details ref={detailsRef} className="relative sm:hidden">
        <summary
          aria-label="Open navigation menu"
          className="border-border-strong text-foreground list-none rounded-full border px-3 py-1.5 text-sm [&::-webkit-details-marker]:hidden"
        >
          Menu
        </summary>
        <nav
          aria-label="Primary"
          className="border-border bg-background-elevated absolute right-0 mt-2 flex w-48 flex-col gap-1 rounded-xl border p-2 shadow-lg"
        >
          <NavLinks
            activeHref={activeHref}
            linkClassName="rounded-lg px-3 py-2 text-sm hover:bg-border/60"
            onNavigate={() => {
              if (detailsRef.current) detailsRef.current.open = false;
            }}
          />
        </nav>
      </details>
    </>
  );
}
