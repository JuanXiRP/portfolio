import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/Card";
import { ChipList } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";

interface SkillsProps {
  skills: Dictionary["skills"];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <Section id="skills" title={skills.heading} subheading={skills.subheading}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((category) => {
          const label = skills.categories[category.id];
          return (
            <Card key={category.id} as="li" className="flex flex-col gap-3 p-5">
              <h3 className="font-semibold">{label}</h3>
              <ChipList items={category.items} label={label} />
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
