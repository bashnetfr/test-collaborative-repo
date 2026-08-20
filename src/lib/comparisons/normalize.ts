import type { CostInput, NormalizedCost } from "./types";

export function normalizeCost(input: CostInput): NormalizedCost {
  switch (input.frequency) {
    case "monthly":
      return { monthly: input.amount, yearly: input.amount * 12 };
    case "yearly":
      return { monthly: input.amount / 12, yearly: input.amount };
    case "one-time":
      return { monthly: input.amount / 12, yearly: input.amount };
  }
}
