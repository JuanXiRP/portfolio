import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { withBasePath } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

interface ContactProps {
  contact: Dictionary["contact"];
  a11y: Dictionary["a11y"];
}

export function Contact({ contact, a11y }: ContactProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Container>
        <div className="border-border bg-card rounded-3xl border px-6 py-12 text-center shadow-sm sm:px-12">
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {contact.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">{contact.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              {contact.email}
            </ButtonLink>
            <ButtonLink
              href={profile.links.linkedin}
              variant="secondary"
              external={a11y.newTab}
            >
              <LinkedInIcon className="size-4" />
              {contact.linkedin}
            </ButtonLink>
            <ButtonLink
              href={profile.links.github}
              variant="secondary"
              external={a11y.newTab}
            >
              <GitHubIcon className="size-4" />
              {contact.github}
            </ButtonLink>
            <ButtonLink href={withBasePath(profile.assets.cv)} variant="ghost" download>
              <Download className="size-4" aria-hidden="true" />
              {contact.cv}
            </ButtonLink>
          </div>
          <p className="text-muted-foreground mt-6 font-mono text-sm">{profile.email}</p>
        </div>
      </Container>
    </section>
  );
}
