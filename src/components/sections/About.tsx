import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";

interface AboutProps {
  about: Dictionary["about"];
}

export function About({ about }: AboutProps) {
  return (
    <Section id="about" title={about.heading}>
      <div className="text-muted-foreground max-w-3xl space-y-5 text-lg leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
