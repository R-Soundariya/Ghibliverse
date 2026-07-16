const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatUsdCompact(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return compactUsd.format(value);
}

export function formatRating(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return value.toFixed(1);
}
