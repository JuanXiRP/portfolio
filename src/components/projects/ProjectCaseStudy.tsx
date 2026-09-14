import { CircleCheck } from "lucide-react";
import type { Project } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { ChipList } from "@/components/ui/Chip";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface ProjectCaseStudyProps {
  project: Project;
  copy: Dictionary["projects"]["items"][Project["id"]];
  labels: Pick<
    Dictionary["projects"],
    | "caseStudy"
    | "problemHeading"
    | "solutionHeading"
    | "decisionsHeading"
    | "architectureHeading"
    | "techHeading"
  >;
  a11y: Dictionary["a11y"];
}

/**
 * A project told as a story: problem, solution, decisions, architecture,
 * stack, code. The layout is intentionally generic so the next project only
 * needs data and copy.
 */
export function ProjectCaseStudy({ project, copy, labels, a11y }: ProjectCaseStudyProps) {
  return (
    <Card
      as="article"
      className="flex flex-col gap-8 p-6 sm:p-10"
      aria-labelledby={`project-${project.id}`}
    >
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{labels.caseStudy}</Badge>
          <Badge>{project.year}</Badge>
        </div>
        <h3
          id={`project-${project.id}`}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {project.name}
        </h3>
        <p className="text-accent text-lg font-medium">{copy.tagline}</p>
        <p className="text-muted-foreground max-w-prose">{copy.summary}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-2 font-semibold">{labels.problemHeading}</h4>
          <p className="text-muted-foreground">{copy.problem}</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">{labels.solutionHeading}</h4>
          <p className="text-muted-foreground">{copy.solution}</p>
        </div>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">{labels.decisionsHeading}</h4>
        <ul className="grid gap-4 sm:grid-cols-2">
          {copy.decisions.map((decision) => (
            <li key={decision.title} className="flex gap-3">
              <CircleCheck
                className="text-success mt-0.5 size-5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium">{decision.title}</p>
                <p className="text-muted-foreground text-sm">{decision.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">{labels.architectureHeading}</h4>
        <ArchitectureDiagram copy={copy.architecture} />
      </div>

      <div>
        <h4 className="mb-3 font-semibold">{labels.techHeading}</h4>
        <ChipList items={project.tech} label={labels.techHeading} />
      </div>

      <footer className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <ButtonLink
            key={link.id}
            href={link.url}
            variant="secondary"
            external={a11y.newTab}
          >
            <GitHubIcon className="size-4" />
            {copy.links[link.id]}
          </ButtonLink>
        ))}
      </footer>
    </Card>
  );
}
