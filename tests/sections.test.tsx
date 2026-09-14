import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "@/data/profile";
import { getDictionary } from "@/i18n/dictionaries";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/layout/Footer";

const en = getDictionary("en");

function externalAnchors(container: HTMLElement): HTMLAnchorElement[] {
  return Array.from(container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
}

describe("Hero", () => {
  it("shows name, role, availability and a downloadable CV", () => {
    render(<Hero hero={en.hero} a11y={en.a11y} />);
    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(en.hero.role)).toBeInTheDocument();
    expect(screen.getByText(en.hero.available)).toBeInTheDocument();

    const cv = screen.getByRole("link", { name: en.hero.downloadCv });
    expect(cv).toHaveAttribute("download");
    expect(cv.getAttribute("href")).toMatch(/\.pdf$/);
    expect(screen.getByRole("img", { name: en.hero.photoAlt })).toBeInTheDocument();
  });

  it("opens every outbound link safely", () => {
    const { container } = render(<Hero hero={en.hero} a11y={en.a11y} />);
    const anchors = externalAnchors(container);
    expect(anchors.length).toBeGreaterThanOrEqual(2);
    for (const anchor of anchors) {
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      expect(anchor).toHaveTextContent(en.a11y.newTab);
    }
  });
});

describe("Metrics", () => {
  it("renders every metric with its value and label", () => {
    render(<Metrics metrics={en.metrics} />);
    for (const metric of profile.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(en.metrics.items[metric.id].label)).toBeInTheDocument();
    }
  });
});

describe("Experience", () => {
  it("lists every role with formatted dates and bullets", () => {
    render(
      <Experience
        locale="en"
        experience={en.experience}
        techLabel={en.projects.techHeading}
        a11y={en.a11y}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: en.experience.items.thales.role }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Feb 2026 – Jul 2026/)).toBeInTheDocument();
    for (const bullet of en.experience.items.thales.bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    }
  });
});

describe("Projects", () => {
  it("links to both repositories of the featured project", () => {
    render(<Projects projects={en.projects} a11y={en.a11y} />);
    const article = screen.getByRole("article", { name: "Hybrid.AI Training" });
    const links = within(article).getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/JuanXiRP/Hybrid-AI-App");
    expect(hrefs).toContain("https://github.com/JuanXiRP/hybrid-ai-backend");
    expect(
      screen.getByRole("img", {
        name: en.projects.items.hybridAi.architecture.diagramLabel,
      }),
    ).toBeInTheDocument();
  });
});

describe("Skills", () => {
  it("renders every category and every skill exactly as declared", () => {
    render(<Skills skills={en.skills} />);
    for (const category of profile.skills) {
      const list = screen.getByRole("list", { name: en.skills.categories[category.id] });
      expect(within(list).getAllByRole("listitem")).toHaveLength(category.items.length);
    }
  });
});

describe("Education", () => {
  it("shows certifications with issuer, year and hours", () => {
    render(<Education education={en.education} />);
    expect(screen.getByText(en.education.items.claudeApi.name)).toBeInTheDocument();
    expect(screen.getByText("Lessthan3 · 2026 · 18 hours")).toBeInTheDocument();
  });
});

describe("Contact and Footer", () => {
  it("offers email, LinkedIn, GitHub and CV", () => {
    render(<Contact contact={en.contact} a11y={en.a11y} />);
    expect(screen.getByRole("link", { name: en.contact.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
    expect(
      screen.getByRole("link", { name: new RegExp(en.contact.linkedin) }),
    ).toHaveAttribute("href", profile.links.linkedin);
    expect(screen.getByRole("link", { name: en.contact.cv })).toHaveAttribute("download");
  });

  it("links to the source repository and shows the current year", () => {
    render(<Footer footer={en.footer} a11y={en.a11y} />);
    expect(
      screen.getByRole("link", { name: new RegExp(en.footer.source) }),
    ).toHaveAttribute("href", profile.links.source);
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
