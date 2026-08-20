/**
 * MOCK comparison engine — replace this with the real module later.
 *
 * Signature: getComparisons(amount, frequency) -> Array<{ text, category }>
 * - amount: number (dollars)
 * - frequency: "one-time" | "monthly" | "yearly"
 * - returns: array of 4 comparison objects
 */
export function getComparisons(amount, frequency) {
  const monthly = frequency === 'monthly' ? amount
    : frequency === 'yearly' ? amount / 12
    : amount;

  const yearly = frequency === 'yearly' ? amount
    : frequency === 'monthly' ? amount * 12
    : amount;

  return [
    {
      text: `${Math.round(yearly / 5)} coffees per year`,
      category: 'food',
    },
    {
      text: `${Math.round(monthly / 15)} streaming subscriptions`,
      category: 'entertainment',
    },
    {
      text: `${Math.round(yearly / 250)} hours of work (at $250/day)`,
      category: 'time',
    },
    {
      text: `${(yearly / 600).toFixed(1)}% of a PS5 per year`,
      category: 'goods',
    },
  ];
}
