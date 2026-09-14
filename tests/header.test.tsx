import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";

const en = getDictionary("en");

function renderHeader() {
  return render(
    <Header locale="en" name="Juan Ruiz Platón" nav={en.nav} a11y={en.a11y} />,
  );
}

describe("Header", () => {
  it("renders anchor navigation for every section", () => {
    renderHeader();
    const nav = screen.getAllByRole("navigation", { name: en.a11y.mainNav })[0];
    for (const [id, label] of Object.entries(en.nav)) {
      const link = Array.from(nav.querySelectorAll("a")).find(
        (a) => a.textContent === label,
      );
      expect(link, id).toBeDefined();
      expect(link).toHaveAttribute("href", `#${id}`);
    }
  });

  it("marks the current locale and links to the other one", () => {
    renderHeader();
    const current = screen.getByRole("link", { name: "English", current: "page" });
    expect(current).toBeInTheDocument();
    // `next/link` only knows about `trailingSlash` at build time, so accept both forms here.
    expect(screen.getByRole("link", { name: "Español" }).getAttribute("href")).toMatch(
      /^\/es\/?$/,
    );
  });

  it("toggles the mobile menu and closes it after choosing a section", () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: en.a11y.openMenu });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: en.a11y.closeMenu })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    const mobileNav = document.getElementById("mobile-nav");
    expect(mobileNav).not.toHaveClass("hidden");

    fireEvent.click(screen.getAllByRole("link", { name: en.nav.projects })[1]);
    expect(mobileNav).toHaveClass("hidden");
  });

  it("exposes an accessible theme toggle", () => {
    renderHeader();
    expect(
      screen.getByRole("button", {
        name: new RegExp(
          `${en.a11y.themeToggle}|${en.a11y.themeDark}|${en.a11y.themeLight}`,
        ),
      }),
    ).toBeInTheDocument();
  });
});
