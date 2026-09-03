"""Regenerate public/resume.pdf.

Content here is intentionally hand-maintained, not derived from
src/content/experience.ts — the resume uses more formal, ATS-oriented
phrasing than the site's web copy. When the resume changes, update the
bullet text below to match and rerun:

    python3 -m pip install reportlab   # if not already installed
    python3 scripts/generate-resume.py
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO_ROOT, "public", "resume.pdf")

styles = getSampleStyleSheet()
FONT = "Helvetica"
FONT_BOLD = "Helvetica-Bold"

name_style = ParagraphStyle(
    "Name", parent=styles["Title"], fontName=FONT_BOLD, fontSize=20,
    leading=24, alignment=TA_CENTER, spaceAfter=2,
)
subtitle_style = ParagraphStyle(
    "Subtitle", parent=styles["Normal"], fontName=FONT, fontSize=9.5,
    leading=13, alignment=TA_CENTER, textColor=colors.HexColor("#333333"),
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontName=FONT, fontSize=9.5,
    leading=13, alignment=TA_CENTER, spaceAfter=10,
    textColor=colors.HexColor("#333333"),
)
section_style = ParagraphStyle(
    "Section", parent=styles["Heading2"], fontName=FONT_BOLD, fontSize=11.5,
    leading=14, spaceBefore=12, spaceAfter=4,
    textColor=colors.HexColor("#0f172a"),
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName=FONT, fontSize=9.7,
    leading=13.5, spaceAfter=6,
)
role_style = ParagraphStyle(
    "Role", parent=styles["Normal"], fontName=FONT_BOLD, fontSize=10.2,
    leading=13, spaceBefore=8, spaceAfter=1,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=styles["Normal"], fontName=FONT, fontSize=9.5,
    leading=13, spaceAfter=4, leftIndent=14, bulletIndent=2,
)
skills_style = ParagraphStyle(
    "Skills", parent=styles["Normal"], fontName=FONT, fontSize=9.5,
    leading=14, spaceAfter=3,
)

story = []

story.append(Paragraph("Juan Romero", name_style))
story.append(
    Paragraph(
        "Senior Full-Stack Software Engineer | React &bull; TypeScript &bull; "
        "Frontend Architecture &bull; Experimentation &amp; Conversion Optimization",
        subtitle_style,
    )
)
story.append(
    Paragraph(
        "San Diego, CA &nbsp;|&nbsp; (210) 846-7265 &nbsp;|&nbsp; "
        "jjromee05@gmail.com &nbsp;|&nbsp; juan-rome.github.io",
        contact_style,
    )
)
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#999999")))

story.append(Paragraph("Profile", section_style))
story.append(
    Paragraph(
        "Senior Full-Stack Software Engineer with 8+ years of experience building "
        "scalable, customer-focused web applications across fintech and enterprise "
        "platforms. Specialized in React, TypeScript, Angular, Spring Boot, "
        "experimentation platforms, and modern frontend architecture, with a strong "
        "focus on accessibility, conversion optimization, developer experience, and "
        "platform reliability. Promoted to Senior Software Engineer in 2025 in "
        "recognition of consistently exceeding expectations, with a proven track "
        "record of owning cross-functional programs end-to-end, building "
        "experimentation and developer-tooling infrastructure adopted team-wide, "
        "and driving measurable business impact through A/B experimentation, "
        "AI-assisted development workflows, and frontend modernization.",
        body_style,
    )
)

story.append(Paragraph("Technical Skills", section_style))
skills = [
    ("Languages", "JavaScript, TypeScript, HTML, CSS, Java, SQL"),
    ("Frontend", "React, Next.js, Angular, RxJS, Storyblok CMS"),
    ("Backend", "Spring Boot, Spring Batch, Node.js"),
    (
        "Experimentation &amp; Analytics",
        "Optimizely (Web &amp; Feature Experimentation), Amplitude, FullStory, "
        "Feature Flagging, A/B &amp; Multi-Armed Bandit Testing",
    ),
    ("Cloud &amp; DevOps", "AWS, NGINX, New Relic, PagerDuty"),
    (
        "Testing &amp; QA",
        "Cypress, E2E Test Automation, K6 Performance Testing, Test-Driven Development",
    ),
    ("Practices", "Accessibility (WCAG 2.1 AA) &amp; Performance Optimization"),
    (
        "AI &amp; Developer Tooling",
        "Claude Code, Figma/Jira MCP-based agentic workflows, Copilot",
    ),
]
for label, value in skills:
    story.append(Paragraph(f"<b>{label}:</b> {value}", skills_style))

story.append(Paragraph("Professional Experience", section_style))


def add_role(title, company, dates, bullets):
    story.append(Paragraph(f"{title} | {company} | {dates}", role_style))
    for b in bullets:
        story.append(Paragraph(b, bullet_style, bulletText="•"))
    story.append(Spacer(1, 2))


add_role(
    "Senior Software Engineer",
    "Earnest",
    "04/2024 to Present (promoted from Software Engineer II, Q3 2025)",
    [
        "Led frontend development and experimentation efforts across Earnest's Rate Check funnel using React, TypeScript, and Next.js, contributing to measurable increases in conversion and application submissions.",
        "Architected and delivered the front-end build-out of two major cross-team programs, the Unified Application Flow (UAF) funnel migration and the Medical Residency application flow, using AI-assisted workflows (Claude + Figma/Jira MCPs) to accelerate design-to-production delivery.",
        "Drove multiple high-impact A/B and multi-armed bandit experiments via Optimizely that improved funnel engagement and conversion, including +4.41% lift in Rate Check Results Viewed, +3.95% to 9.3% lifts through funnel reordering and step-reduction experiments, +18% lift in Application Submission through messaging updates, and +23% lift through ticker experience enhancements.",
        "Led integration of Verified's phone-based identity verification platform into the refinance rate check funnel, partnering cross-functionally with internal and external engineering teams to deliver a secure, scalable onboarding experience that increased conversion rates by 17% from rate check start to submission.",
        "Built and scaled shared experimentation infrastructure, including a centralized useExperiment hook (bucketing ID logic, Redis-backed sticky bucketing), an Optimizely SDK wrapper, and K6 performance test suites, establishing reusable foundations now relied on by every active experiment across the team.",
        "Designed and implemented nginx proxy architecture enabling multiple Next.js applications to run concurrently on shared staging and production servers, unblocking platform deployment beyond typical front-end scope.",
        "Redesigned refinance calculator experiences with a strong focus on accessibility and usability, increasing accessibility scores to 85%+ while reducing customer drop-off and ensuring WCAG 2.1 AA compliance.",
        "Partnered cross-functionally with Security and Data & Analytics teams, tightening environment variable boundary risk following a production incident and auditing Optimizely bucketing consistency across lending surfaces, strengthening platform reliability and experiment data integrity.",
        "Optimized New Relic and PagerDuty alerting workflows by refining alert thresholds and consolidating redundant monitoring, reducing alert noise by 80 to 90% and improving mean-time-to-acknowledge (MTTA).",
        "Leveraged Claude Code and agentic coding workflows to accelerate feature development, test coverage, and debugging, cutting routine implementation time by an estimated 30% while maintaining code quality standards.",
    ],
)

add_role(
    "Senior Software Engineer",
    "Capital One",
    "05/2022 to 10/2023",
    [
        "Led development of three major integrations and frontend redesigns using Lit web components, improving user adoption by 35% and overall user experience metrics by 65%.",
        "Partnered cross-functionally with Engineering, QA, and Operations teams to resolve complex production issues, reducing application errors by 30% and improving platform reliability.",
        "Architected and delivered solutions for 15+ new and existing features across micro frontend applications, improving host compatibility and customer experience.",
    ],
)

add_role(
    "Full Stack Software Engineer II",
    "HEB Grocery",
    "04/2020 to 05/2022",
    [
        "Diagnosed and resolved production issues, ensuring 99% uptime and reducing incident resolution time by 40% through proactive monitoring and alerting systems.",
        "Collaborated with designers, stakeholders, and engineers to deliver customer-facing features using Angular, RxJS, TypeScript, HTML, and CSS.",
        "Streamlined onboarding for junior engineers by creating training materials and conducting workshops that reduced ramp-up time by 50%.",
    ],
)

add_role(
    "Full Stack Software Engineer",
    "HEB Grocery",
    "06/2018 to 04/2020",
    [
        "Implemented new application features and resolved complex technical issues, improving user satisfaction and reducing customer-reported defects.",
        "Developed automated batch processing jobs using Spring Boot, Spring Batch, Java, MySQL, JDBC, and JPA, reducing data processing time by 40%.",
    ],
)

story.append(Paragraph("Education", section_style))
story.append(Paragraph("Bachelor's Degree, University of Texas at San Antonio", body_style))

doc = SimpleDocTemplate(
    OUT,
    pagesize=letter,
    leftMargin=0.7 * inch,
    rightMargin=0.7 * inch,
    topMargin=0.55 * inch,
    bottomMargin=0.55 * inch,
    title="Juan Romero - Resume",
    author="Juan Romero",
)
doc.build(story)
print("wrote", OUT)
