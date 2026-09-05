// All prices are stored in South African Rand (ZAR) in the database, since
// that's the currency actual tuition/rent is paid in. We display USD on
// the site because it's the reference currency most of our Gulf/Arab
// students think in. This is an approximate, editable conversion rate —
// update ZAR_TO_USD periodically to keep displayed estimates realistic.
export const ZAR_TO_USD = 0.054; // ~ 1 ZAR = $0.054 (≈ R18.5 per $1)

export function zarToUsd(zar: number) {
  return Math.round(zar * ZAR_TO_USD);
}

export function formatUsd(zar: number) {
  return new Intl.NumberFormat("en-US").format(zarToUsd(zar));
}

export function formatUsdRange(minZar: number, maxZar: number) {
  return `$${formatUsd(minZar)}–${formatUsd(maxZar)}`;
}
