import { PriceOption } from "./types/types";
export const getLowestPrice = (
  prices?: { label: string; price: number }[]
): number => {
  if (!prices || prices.length === 0) return 0;
  return Math.min(...prices.map((p) => p.price));
};
