import { Award, GraduationCap, Languages } from "lucide-react";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

interface EducationProps {
  education: Dictionary["education"];
}

export function Education({ education }: EducationProps) {
  const { items, spokenLanguages } = education;

  return (
    <Section id="education" title={education.heading}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col gap-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <Award className="text-accent size-5" aria-hidden="true" />
            {education.certifications}
          </h3>
          <ul className="flex flex-col gap-5">
            {profile.certifications.map((certification) => {
              const copy = items[certification.id];
              const meta = [
                certification.issuer,
                certification.year,
                certification.hours
                  ? format(education.hours, { hours: certification.hours })
                  : null,
              ]
                .filter(Boolean)
                .join(" · ");
              return (
                <li key={certification.id}>
                  <p className="font-medium">{copy.name}</p>
                  <p className="text-muted-foreground font-mono text-xs">{meta}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{copy.detail}</p>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <GraduationCap className="text-accent size-5" aria-hidden="true" />
              {education.degrees}
            </h3>
            <ul className="flex flex-col gap-5">
              {profile.education.map((degree) => {
                const copy = items[degree.id];
                return (
                  <li key={degree.id}>
                    <p className="font-medium">{copy.name}</p>
                    <p className="text-muted-foreground text-sm">{copy.school}</p>
                    <p className="text-muted-foreground font-mono text-xs">
                      {degree.start} – {degree.end}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Languages className="text-accent size-5" aria-hidden="true" />
              {education.languages}
            </h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="font-medium">{spokenLanguages.spanish}</dt>
              <dd className="text-muted-foreground">{spokenLanguages.spanishLevel}</dd>
              <dt className="font-medium">{spokenLanguages.english}</dt>
              <dd className="text-muted-foreground">{spokenLanguages.englishLevel}</dd>
            </dl>
          </Card>
        </div>
      </div>
    </Section>
  );
}
