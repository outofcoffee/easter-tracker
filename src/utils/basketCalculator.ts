// Estimated world population for 2025
const WORLD_POPULATION = 8_100_000_000;

// One basket can serve multiple people in a household
const PEOPLE_PER_BASKET = 4;

// Calculate how many baskets have been delivered based on completion percentage
export const calculateBasketsDelivered = (completionPercentage: number): number => {
  const totalBaskets = Math.ceil(WORLD_POPULATION / PEOPLE_PER_BASKET);
  const deliveredBaskets = Math.floor(totalBaskets * (completionPercentage / 100));
  return deliveredBaskets;
};

// Format large numbers with commas
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};