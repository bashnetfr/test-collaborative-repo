import { getComparisons as engineGetComparisons } from './comparisons';

const CATEGORY_MAP = {
  food: 'food',
  entertainment: 'entertainment',
  tech: 'goods',
  lifestyle: 'time',
  travel: 'goods',
  utilities: 'time',
};

/**
 * Comparison engine — wraps the real module with the UI's expected signature.
 *
 * Signature: getComparisons(amount, frequency, options?) -> Array<{ text, category }>
 * - amount: number (dollars)
 * - frequency: "one-time" | "monthly" | "yearly"
 * - options: { hourlyWage?: number, count?: number }
 * - returns: array of comparison objects
 */
export function getComparisons(amount, frequency, options = {}) {
  const results = engineGetComparisons({ amount, frequency }, options);
  return results.map((r) => ({
    text: r.text,
    category: CATEGORY_MAP[r.referenceItem.category] || 'time',
  }));
}
