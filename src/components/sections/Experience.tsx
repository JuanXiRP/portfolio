import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatRange } from "@/lib/dates";
import { ChipList } from "@/components/ui/Chip";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section } from "@/components/ui/Section";

interface ExperienceProps {
  locale: Locale;
  experience: Dictionary["experience"];
  techLabel: string;
  a11y: Dictionary["a11y"];
}

export function Experience({ locale, experience, techLabel, a11y }: ExperienceProps) {
  return (
    <Section id="experience" title={experience.heading}>
      <ol className="border-border relative ml-3 border-l">
        {profile.experience.map((item) => {
          const copy = experience.items[item.id];
          return (
            <li key={item.id} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="border-background bg-accent absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2"
              />
              <article className="flex flex-col gap-3">
                <header>
                  <p className="text-muted-foreground font-mono text-xs">
                    <time dateTime={item.start}>
                      {formatRange(item.start, item.end, locale, experience.present)}
                    </time>
                    {" · "}
                    {item.location}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{copy.role}</h3>
                  <p className="text-muted-foreground">
                    {item.url ? (
                      <ExternalLink
                        href={item.url}
                        newTabLabel={a11y.newTab}
                        className="text-foreground font-medium underline-offset-4 hover:underline"
                      >
                        {item.company}
                      </ExternalLink>
                    ) : (
                      item.company
                    )}
                  </p>
                </header>
                <ul className="text-muted-foreground marker:text-accent list-disc space-y-2 pl-5">
                  {copy.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {item.tech.length > 0 ? (
                  <ChipList items={item.tech} label={techLabel} />
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
