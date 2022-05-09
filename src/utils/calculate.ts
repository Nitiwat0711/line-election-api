export const calculatePercentage = (amount: number, full: number) => {
  return ((amount / full) * 100).toPrecision(2);
};
