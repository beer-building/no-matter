import { eachMonthOfInterval } from 'date-fns';

export const generateMonthsByYear = (year: number): Array<Date> =>
	eachMonthOfInterval({
		start: new Date(year, 0, 1),
		end: new Date(year, 11, 31)
	});
