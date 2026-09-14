import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section } from "@/components/ui/Section";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";

interface ProjectsProps {
  projects: Dictionary["projects"];
  a11y: Dictionary["a11y"];
}

export function Projects({ projects, a11y }: ProjectsProps) {
  const {
    caseStudy,
    problemHeading,
    solutionHeading,
    decisionsHeading,
    architectureHeading,
    techHeading,
  } = projects;

  return (
    <Section id="projects" title={projects.heading}>
      <div className="flex flex-col gap-8">
        {profile.projects.map((project) => (
          <ProjectCaseStudy
            key={project.id}
            project={project}
            copy={projects.items[project.id]}
            labels={{
              caseStudy,
              problemHeading,
              solutionHeading,
              decisionsHeading,
              architectureHeading,
              techHeading,
            }}
            a11y={a11y}
          />
        ))}
        <p className="text-muted-foreground">
          {projects.moreComing}{" "}
          <ExternalLink
            href={profile.links.github}
            newTabLabel={a11y.newTab}
            className="text-foreground hover:text-accent font-medium underline underline-offset-4"
          >
            github.com/{profile.githubUser}
          </ExternalLink>
        </p>
      </div>
    </Section>
  );
}
