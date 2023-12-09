import { roundTwoDecimals } from './round-two-decimals';

export const formatCurrency = (value: number, currency: 'HRK' | 'EUR') => {
	const formatter = new Intl.NumberFormat('hr-HR', {
		style: 'currency',
		currency: currency
	});

	return formatter.format(roundTwoDecimals(value));
};
