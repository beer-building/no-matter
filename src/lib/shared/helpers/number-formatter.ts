export const formatAmount = (amount: number): string => {
	return new Intl.NumberFormat("en-US").format(amount === 0 ? 0 : amount);
};
