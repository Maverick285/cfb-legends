import type { ReactNode } from "react";

type StatusBadgeProps = {
  children: ReactNode;
};

export function StatusBadge({ children }: StatusBadgeProps) {
  return <span>{children}</span>;
}
