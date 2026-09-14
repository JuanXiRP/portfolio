import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon } from "@/components/ui/BrandIcons";

interface FooterProps {
  footer: Dictionary["footer"];
  a11y: Dictionary["a11y"];
}

export function Footer({ footer, a11y }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border text-muted-foreground border-t py-10 text-sm">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md">{footer.builtWith}</p>
        <div className="flex flex-col gap-2 sm:items-end">
          <ExternalLink
            href={profile.links.source}
            newTabLabel={a11y.newTab}
            className="text-foreground hover:text-accent inline-flex items-center gap-2 font-medium"
          >
            <GitHubIcon className="size-4" />
            {footer.source}
          </ExternalLink>
          <p>{format(footer.rights, { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
