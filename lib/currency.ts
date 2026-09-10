// Prices are stored directly in USD in the database — schools and
// accommodation used to be stored in ZAR with a conversion applied at
// display time, but since neither the admin panel nor the public site
// ever showed ZAR to anyone, that conversion layer was pure overhead
// and a source of staleness risk (displayed prices would silently
// drift if the rate constant changed). These are now plain formatters,
// not currency converters.
export function formatUsd(usd: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(usd));
}

export function formatUsdRange(minUsd: number, maxUsd: number) {
  // Collapse to a single figure when min and max are the same (e.g. a
  // studio with one fixed monthly rent) — showing "$281–281" reads as
  // a bug, not a range.
  if (Math.round(minUsd) === Math.round(maxUsd)) {
    return `$${formatUsd(minUsd)}`;
  }
  return `$${formatUsd(minUsd)}–${formatUsd(maxUsd)}`;
}
