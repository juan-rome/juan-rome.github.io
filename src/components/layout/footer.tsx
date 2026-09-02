import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-border text-muted border-t py-10 text-sm">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js, deployed on GitHub
          Pages.
        </p>
        <div className="flex gap-5">
          <a
            href={site.links.github}
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href={site.links.email} className="hover:text-foreground">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
