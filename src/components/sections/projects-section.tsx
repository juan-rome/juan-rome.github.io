"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCollapse } from "@/components/ui/animated-collapse";
import { Chevron, toggleButtonClass } from "@/components/ui/disclosure-button";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

function ProjectDetail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="text-muted text-xs font-semibold tracking-wide uppercase">
        {label}
      </h4>
      <p className="text-foreground/80 mt-2 text-sm text-pretty">{text}</p>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const expandRef = useRef<HTMLButtonElement>(null);
  const detailId = `${project.slug}-case-study`;

  return (
    <FadeIn delay={index * 0.04}>
      <article
        id={project.slug}
        className="border-border scroll-mt-24 rounded-2xl border p-6 sm:p-10"
      >
        <p className="text-accent-text text-xs font-medium">{project.company}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="text-muted mt-3 max-w-2xl text-pretty">{project.summary}</p>

        <ul className="mt-6 space-y-1.5">
          {project.impact.map((item) => (
            <li key={item} className="text-foreground/80 flex gap-2 text-sm text-pretty">
              <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border-border-strong text-muted rounded-full border px-2.5 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {!detailOpen ? (
          <button
            ref={expandRef}
            type="button"
            onClick={() => setDetailOpen(true)}
            aria-expanded={false}
            aria-controls={detailId}
            className={cn(toggleButtonClass, "mt-6")}
          >
            <span>Read the full case study</span>
            <Chevron />
          </button>
        ) : null}
        <AnimatedCollapse open={detailOpen} id={detailId} className="mt-6">
          <div className="border-border grid gap-6 border-t pt-6 sm:grid-cols-2">
            <ProjectDetail label="Problem" text={project.problem} />
            <ProjectDetail label="Architecture" text={project.architecture} />
            <ProjectDetail label="Tradeoffs" text={project.tradeoffs} />
            <ProjectDetail label="Challenges" text={project.challenges} />
          </div>
          <div className="border-accent-text mt-6 border-l-2 pl-4">
            <h4 className="text-accent-text text-xs font-semibold tracking-wide uppercase">
              Lessons
            </h4>
            <p className="mt-1.5 text-sm text-pretty italic">{project.lessons}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDetailOpen(false);
              requestAnimationFrame(() => expandRef.current?.focus());
            }}
            aria-expanded={true}
            aria-controls={detailId}
            className={cn(toggleButtonClass, "mt-6")}
          >
            <span>Show less</span>
            <Chevron flipped />
          </button>
        </AnimatedCollapse>
      </article>
    </FadeIn>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Engineering Work"
        title="A few problems worth explaining properly"
        description="These are internal Earnest products, so there's no public repo or live demo to link: the write-up is the case study."
      />
      <div className="mt-14 space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
