import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";

interface MetricsProps {
  metrics: Dictionary["metrics"];
}

/**
 * The numbers a recruiter scans first. Values live in `profile.ts`; the label
 * and its context are translated so the figure is never shown without what it
 * means.
 */
export function Metrics({ metrics }: MetricsProps) {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="border-border bg-muted/50 border-y py-12"
    >
      <Container>
        <h2
          id="metrics-heading"
          className="text-muted-foreground mb-8 font-mono text-xs font-medium tracking-widest uppercase"
        >
          {metrics.heading}
        </h2>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {profile.metrics.map((metric) => {
            const copy = metrics.items[metric.id];
            return (
              <div key={metric.id} className="flex flex-col gap-1">
                <dt className="order-2 text-sm font-medium">{copy.label}</dt>
                <dd className="text-accent order-1 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                  {metric.value}
                </dd>
                <dd className="text-muted-foreground order-3 text-xs">{copy.context}</dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
