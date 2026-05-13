export function feet(inches: number): string {
  const ft = Math.floor(inches / 12);
  const rest = inches % 12;
  return `${ft}'${rest}"`;
}

export function money(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

export function titleCase(value: string): string {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
