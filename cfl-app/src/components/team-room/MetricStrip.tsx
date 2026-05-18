import type { ReactNode } from "react";

export type MetricItem = {
  label: string;
  value: ReactNode;
  note?: ReactNode;
};

type MetricStripProps = {
  metrics: MetricItem[];
  className: "overview-metrics" | "context-grid";
};

export function MetricStrip({ metrics, className }: MetricStripProps) {
  return (
    <div className={className}>
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}

export function MetricCard({ label, value, note }: MetricItem) {
  return (
    <div className="overview-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {note !== undefined && <em>{note}</em>}
    </div>
  );
}

export type BreakdownItem = {
  label: string;
  value: number;
};

type BreakdownCardProps = {
  title: string;
  values: BreakdownItem[];
  compact?: boolean;
};

export function BreakdownCard({ title, values, compact = false }: BreakdownCardProps) {
  return (
    <div className="breakdown-card">
      <span>{title}</span>
      <div className={`breakdown-values${compact ? " compact" : ""}`}>
        {values.map((item) => (
          <strong key={item.label}>{item.label}<em>{item.value}</em></strong>
        ))}
      </div>
    </div>
  );
}
