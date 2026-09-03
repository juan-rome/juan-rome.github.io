import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

type NavLinksProps = {
  activeHref: string | null;
  linkClassName?: string;
  onNavigate?: () => void;
};

/**
 * Renders navLinks as plain anchors — same-page hash links get correct,
 * native scroll-to-anchor behavior from the browser for free (combined with
 * scroll-smooth on <html> and scroll-mt-* on each Section for header
 * offset). Purely presentational: activeHref is computed once by the
 * caller via useActiveSection() and passed in, so multiple NavLinks
 * instances (desktop + mobile) on the page share one scroll listener
 * instead of each running their own.
 */
export function NavLinks({ activeHref, linkClassName, onNavigate }: NavLinksProps) {
  return (
    <>
      {navLinks.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "underline-offset-4 transition-colors",
              isActive ? "text-foreground underline" : "text-muted hover:text-foreground",
              linkClassName
            )}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}
