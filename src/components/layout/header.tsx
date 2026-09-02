import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/nav";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="text-foreground text-sm font-semibold tracking-tight"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground rounded-full px-3 py-2 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="group relative sm:hidden">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:bg-border/60 hover:text-foreground rounded-lg px-3 py-2 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
