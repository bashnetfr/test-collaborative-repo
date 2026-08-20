export type Frequency = "one-time" | "monthly" | "yearly";

export type ReferenceCategory =
  | "food"
  | "entertainment"
  | "tech"
  | "lifestyle"
  | "travel"
  | "utilities";

export interface CostInput {
  amount: number;
  frequency: Frequency;
}

export interface NormalizedCost {
  monthly: number;
  yearly: number;
}

export interface ReferenceItem {
  id: string;
  name: string;
  price: number;
  frequency: Frequency;
  category: ReferenceCategory;
}

export interface Comparison {
  referenceItem: ReferenceItem;
  value: number;
  unit: string;
  text: string;
  basis: "monthly" | "yearly";
}

export interface ComparisonOptions {
  hourlyWage?: number;
  count?: number;
}
