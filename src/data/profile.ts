/**
 * Structured, non-translatable facts about the candidate. Every piece of prose
 * (roles, bullet points, descriptions) lives in `messages/<locale>.json`,
 * keyed by the `id`s declared here, so adding a language never touches this
 * file and adding a project never touches a component.
 */

export type SkillCategoryId =
  | "languages"
  | "backend"
  | "frontend"
  | "mobile"
  | "databases"
  | "testing"
  | "devops"
  | "ai"
  | "practices";

export interface SkillCategory {
  id: SkillCategoryId;
  items: readonly string[];
}

export type ExperienceId = "thales" | "trainer";

export interface Experience {
  id: ExperienceId;
  company: string;
  location: string;
  /** ISO month (`2026-02`) or bare year (`2020`) when the CV is no more precise. */
  start: string;
  /** Same format as `start`, or `null` for an ongoing role. */
  end: string | null;
  url?: string;
  tech: readonly string[];
}

export type ProjectId = "hybridAi";

export type ProjectLinkId = "app" | "backend";

export interface ProjectLink {
  id: ProjectLinkId;
  url: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  year: number;
  featured: boolean;
  tech: readonly string[];
  links: readonly ProjectLink[];
}

export type MetricId = "coverage" | "accuracy" | "stakeholders" | "devTime";

export interface Metric {
  id: MetricId;
  value: string;
}

export type CertificationId = "claudeApi" | "aiEnterprise";

export interface Certification {
  id: CertificationId;
  issuer: string;
  year: number;
  hours?: number;
  url?: string;
}

export type DegreeId = "hnd" | "bsc";

export interface Degree {
  id: DegreeId;
  start: number;
  end: number;
}

export const profile = {
  name: "Juan Ruiz Platón",
  firstName: "Juan",
  email: "juanruizplaton@gmail.com",
  githubUser: "JuanXiRP",
  links: {
    github: "https://github.com/JuanXiRP",
    linkedin: "https://www.linkedin.com/in/juan-ruiz-platon",
    /** The repository of this very site, linked from the footer. */
    source: "https://github.com/JuanXiRP/portfolio",
  },
  /** Paths are relative to `public/`; prefix them with `withBasePath()`. */
  assets: {
    cv: "/cv-juan-ruiz-platon.pdf",
    photo: "/photo.webp",
    ogImage: "/og-image.png",
  },
  metrics: [
    { id: "coverage", value: "95%" },
    { id: "accuracy", value: "+25%" },
    { id: "stakeholders", value: "60+" },
    { id: "devTime", value: "−15%" },
  ] satisfies readonly Metric[],
  experience: [
    {
      id: "thales",
      company: "Thales Netherlands",
      location: "Hengelo, NL",
      start: "2026-02",
      end: "2026-07",
      url: "https://www.thalesgroup.com/en/countries/europe/netherlands",
      tech: [
        "Java",
        "Spring Boot",
        "React",
        "TypeScript",
        "JUnit 5",
        "Mockito",
        "Jenkins",
        "SonarQube",
      ],
    },
    {
      id: "trainer",
      company: "Various centres",
      location: "Spain",
      start: "2020",
      end: "2026",
      tech: [],
    },
  ] satisfies readonly Experience[],
  projects: [
    {
      id: "hybridAi",
      name: "Hybrid.AI Training",
      year: 2026,
      featured: true,
      tech: [
        "Kotlin",
        "Jetpack Compose",
        "Hilt",
        "Room",
        "Retrofit",
        "Node.js",
        "Express",
        "MongoDB Atlas",
        "Google Gemini",
        "JWT",
        "Jest",
        "Trivy",
        "Render",
      ],
      links: [
        { id: "app", url: "https://github.com/JuanXiRP/Hybrid-AI-App" },
        { id: "backend", url: "https://github.com/JuanXiRP/hybrid-ai-backend" },
      ],
    },
  ] satisfies readonly Project[],
  skills: [
    {
      id: "languages",
      items: [
        "Java",
        "Kotlin",
        "TypeScript",
        "JavaScript (ESNext)",
        "Python",
        "SQL",
        "HTML5 / CSS3",
      ],
    },
    {
      id: "backend",
      items: [
        "Spring Boot",
        "Node.js",
        "Express",
        "REST API design",
        "FastAPI",
        "JWT authentication",
      ],
    },
    { id: "frontend", items: ["React", "TypeScript", "Tailwind CSS", "Jetpack Compose"] },
    {
      id: "mobile",
      items: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Room", "Retrofit"],
    },
    { id: "databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQLite"] },
    {
      id: "testing",
      items: [
        "JUnit 5",
        "Mockito",
        "Jest",
        "PyTest",
        "React Testing Library",
        "Unit & integration testing",
      ],
    },
    {
      id: "devops",
      items: [
        "Git",
        "Docker",
        "Jenkins",
        "GitLab CI",
        "GitHub Actions",
        "SonarQube",
        "Jira",
      ],
    },
    {
      id: "ai",
      items: ["LLM integration", "Google Gemini", "Claude API", "Prompt engineering"],
    },
    {
      id: "practices",
      items: ["Agile / Scrum", "Code review", "Clean Code", "SOLID", "OOP", "SDLC"],
    },
  ] satisfies readonly SkillCategory[],
  certifications: [
    { id: "claudeApi", issuer: "Anthropic", year: 2026 },
    { id: "aiEnterprise", issuer: "Lessthan3", year: 2026, hours: 18 },
  ] satisfies readonly Certification[],
  education: [
    { id: "hnd", start: 2023, end: 2026 },
    { id: "bsc", start: 2016, end: 2020 },
  ] satisfies readonly Degree[],
} as const;

export type Profile = typeof profile;
