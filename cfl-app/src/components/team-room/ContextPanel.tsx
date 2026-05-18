import type { MetricItem } from "./MetricStrip";
import { MetricStrip } from "./MetricStrip";

type ContextPanelProps = {
  title: string;
  metrics: MetricItem[];
};

export function ContextPanel({ title, metrics }: ContextPanelProps) {
  return (
    <section className="context-band">
      <h2>{title}</h2>
      <MetricStrip className="context-grid" metrics={metrics} />
    </section>
  );
}
