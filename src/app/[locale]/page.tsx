import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { personJsonLd, serializeJsonLd } from "@/lib/jsonld";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const { a11y } = dictionary;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personJsonLd(locale, dictionary)),
        }}
      />
      <Hero hero={dictionary.hero} a11y={a11y} />
      <Metrics metrics={dictionary.metrics} />
      <About about={dictionary.about} />
      <Experience
        locale={locale}
        experience={dictionary.experience}
        techLabel={dictionary.projects.techHeading}
        a11y={a11y}
      />
      <Projects projects={dictionary.projects} a11y={a11y} />
      <Skills skills={dictionary.skills} />
      <Education education={dictionary.education} />
      <Contact contact={dictionary.contact} a11y={a11y} />
    </>
  );
}
