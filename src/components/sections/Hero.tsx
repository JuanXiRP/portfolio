import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { withBasePath } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

interface HeroProps {
  hero: Dictionary["hero"];
  a11y: Dictionary["a11y"];
}

export function Hero({ hero, a11y }: HeroProps) {
  const iconLink =
    "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <section id="top" aria-label={profile.name} className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>
              {hero.available}
            </Badge>
            <Badge variant="accent">{hero.euCitizen}</Badge>
          </div>

          <div>
            <p className="text-muted-foreground text-lg">{hero.greeting}</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="text-accent mt-3 text-xl font-semibold sm:text-2xl">
              {hero.role}
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-sm">{hero.stack}</p>
          </div>

          <p className="text-muted-foreground max-w-prose text-lg leading-relaxed">
            {hero.tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={withBasePath(profile.assets.cv)} download>
              <Download className="size-4" aria-hidden="true" />
              {hero.downloadCv}
            </ButtonLink>
            <ButtonLink href="#projects" variant="secondary">
              {hero.viewProjects}
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <ExternalLink
                href={profile.links.github}
                newTabLabel={a11y.newTab}
                className={iconLink}
              >
                <GitHubIcon className="size-4" />
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={profile.links.linkedin}
                newTabLabel={a11y.newTab}
                className={iconLink}
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={iconLink}>
                <Mail className="size-4" aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li className="text-muted-foreground inline-flex items-center gap-2 text-sm">
              <MapPin className="size-4" aria-hidden="true" />
              {hero.location}
            </li>
          </ul>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <Image
            src={withBasePath(profile.assets.photo)}
            alt={hero.photoAlt}
            width={640}
            height={640}
            priority
            sizes="(min-width: 768px) 288px, 208px"
            className="ring-accent-soft size-52 rounded-full object-cover shadow-lg ring-4 md:size-72"
          />
        </div>
      </Container>
    </section>
  );
}
