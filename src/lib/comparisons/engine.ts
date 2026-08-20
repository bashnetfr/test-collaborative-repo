import type {
  CostInput,
  NormalizedCost,
  ReferenceItem,
  Comparison,
  ComparisonOptions,
} from "./types";
import { REFERENCE_ITEMS } from "./references";
import { normalizeCost } from "./normalize";

function roundReadable(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatValue(value: number): string {
  if (Number.isInteger(value)) return `${value}`;
  if (value < 1) return `${roundReadable(value, 2)}`;
  if (value < 10) return `${roundReadable(value, 1)}`;
  return `${roundReadable(value, 0)}`;
}

function pluralize(value: number, name: string): string {
  if (Math.abs(roundReadable(value, 2) - 1) < 0.01) return name;
  return `${name}s`;
}

function scoreComparison(value: number): number {
  if (value <= 0 || value > 10000) return -Infinity;
  const idealCenter = 10;
  const distance = Math.abs(Math.log10(value) - Math.log10(idealCenter));
  return -distance;
}

function buildComparison(
  item: ReferenceItem,
  normalized: NormalizedCost
): Comparison | null {
  if (item.frequency === "monthly") {
    const ratio = normalized.monthly / item.price;
    return {
      referenceItem: item,
      value: ratio,
      unit: item.name,
      text: `${formatValue(ratio)} ${pluralize(ratio, item.name)} per month`,
      basis: "monthly",
    };
  }

  if (item.frequency === "yearly") {
    const ratio = normalized.yearly / item.price;
    return {
      referenceItem: item,
      value: ratio,
      unit: item.name,
      text: `${formatValue(ratio)} ${pluralize(ratio, item.name)} per year`,
      basis: "yearly",
    };
  }

  if (item.frequency === "one-time") {
    const ratio = normalized.yearly / item.price;
    return {
      referenceItem: item,
      value: ratio,
      unit: item.name,
      text: `${formatValue(ratio)} ${pluralize(ratio, item.name)} per year`,
      basis: "yearly",
    };
  }

  return null;
}

export function getComparisons(
  input: CostInput,
  options: ComparisonOptions = {}
): Comparison[] {
  const { hourlyWage, count = 4 } = options;
  const normalized = normalizeCost(input);
  const scored: { comparison: Comparison; score: number }[] = [];

  if (hourlyWage && hourlyWage > 0) {
    const hours = normalized.monthly / hourlyWage;
    scored.push({
      comparison: {
        referenceItem: {
          id: "__hourly-wage__",
          name: "hour",
          price: hourlyWage,
          frequency: "one-time",
          category: "lifestyle",
        },
        value: hours,
        unit: "hours of work",
        text: `${formatValue(hours)} of work`,
        basis: "monthly",
      },
      score: 1000,
    });
  }

  for (const item of REFERENCE_ITEMS) {
    const comp = buildComparison(item, normalized);
    if (!comp) continue;
    const s = scoreComparison(comp.value);
    if (s > -Infinity) {
      scored.push({ comparison: comp, score: s });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const result: Comparison[] = [];

  for (const { comparison } of scored) {
    const key = comparison.referenceItem.id;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(comparison);
    if (result.length >= count) break;
  }

  return result;
}
