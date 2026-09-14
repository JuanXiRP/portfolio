import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "./site";

/**
 * schema.org `Person` markup so search engines and LinkedIn-style previews can
 * attribute the page to a real candidate rather than an anonymous site.
 */
export function personJsonLd(locale: Locale, dictionary: Dictionary) {
  const topSkills = profile.skills
    .filter((category) =>
      ["languages", "backend", "frontend", "mobile"].includes(category.id),
    )
    .flatMap((category) => category.items);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: dictionary.hero.role,
    description: dictionary.meta.description,
    email: `mailto:${profile.email}`,
    url: absoluteUrl(`/${locale}/`),
    image: absoluteUrl(profile.assets.photo),
    sameAs: [profile.links.github, profile.links.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hengelo",
      addressCountry: "NL",
    },
    nationality: { "@type": "Country", name: "Spain" },
    knowsAbout: Array.from(new Set(topSkills)),
    knowsLanguage: ["es", "en"],
    alumniOf: profile.education.map((degree) => ({
      "@type": "EducationalOrganization",
      name: dictionary.education.items[degree.id].school,
    })),
  };
}

/** Escapes `<` so user-visible strings can never close the script tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
