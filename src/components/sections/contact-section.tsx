import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <Section id="contact">
      <FadeIn>
        <div className="border-border rounded-3xl border p-10 text-center sm:p-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s talk about the role
          </h2>
          <p className="text-muted mt-4">
            Open to Senior/Staff Software Engineer roles where I can go deeper on product
            engineering, experimentation, and infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={site.links.email}>Email me</Button>
            <Button
              href={site.links.linkedin}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </Button>
            <Button
              href={site.links.github}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
