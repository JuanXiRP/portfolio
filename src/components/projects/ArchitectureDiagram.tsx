import {
  ArrowDown,
  ArrowRight,
  Database,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type ArchitectureCopy = Dictionary["projects"]["items"]["hybridAi"]["architecture"];

interface ArchitectureDiagramProps {
  copy: ArchitectureCopy;
}

interface NodeProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  detail: string;
  highlight?: boolean;
}

function Node({ icon: Icon, title, detail, highlight = false }: NodeProps) {
  return (
    <div
      className={
        highlight
          ? "border-accent bg-accent-soft flex w-full shrink-0 flex-col items-center gap-1 rounded-xl border px-4 py-3 text-center lg:w-52"
          : "border-border bg-card flex w-full shrink-0 flex-col items-center gap-1 rounded-xl border px-4 py-3 text-center lg:w-52"
      }
    >
      <Icon className="text-accent size-5" />
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground font-mono text-[11px]">{detail}</span>
    </div>
  );
}

function Edge({ label }: { label: string }) {
  return (
    <div className="text-muted-foreground flex shrink-0 flex-col items-center gap-1">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
      <span className="font-mono text-[11px] whitespace-nowrap">{label}</span>
    </div>
  );
}

/**
 * Built with HTML instead of SVG so translated labels wrap naturally, colours
 * follow the theme tokens and the whole figure collapses to a column on
 * phones. The `diagramLabel` sentence describes the flow for screen readers;
 * everything inside is decorative.
 */
export function ArchitectureDiagram({ copy }: ArchitectureDiagramProps) {
  return (
    <figure
      role="img"
      aria-label={copy.diagramLabel}
      className="border-border bg-muted/40 rounded-2xl border border-dashed p-4 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4"
      >
        <Node icon={Smartphone} title={copy.android} detail={copy.androidDetail} />
        <Edge label={copy.edgeAuth} />
        <Node icon={Server} title={copy.api} detail={copy.apiDetail} highlight />
        {/* Both branches hang off the API: side by side on phones, stacked on desktop. */}
        <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto lg:flex-col lg:gap-4">
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
            <Edge label={copy.edgeAi} />
            <Node icon={Sparkles} title={copy.gemini} detail={copy.geminiDetail} />
          </div>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
            <Edge label={copy.edgePersist} />
            <Node icon={Database} title={copy.db} detail={copy.dbDetail} />
          </div>
        </div>
      </div>
    </figure>
  );
}
