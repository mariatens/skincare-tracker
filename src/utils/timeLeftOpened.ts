import { addMonths, differenceInDays, differenceInMonths } from 'date-fns';

export function calculateTimeLeftOpenedProducts(
  openedDate: string,
  months: string
): string {
  const expiryDate = addMonths(new Date(openedDate), parseInt(months));
  const monthsLeft = differenceInMonths(new Date(expiryDate), new Date());
  if (monthsLeft < 1) {
    return `${
      differenceInDays(new Date(expiryDate), new Date()) + 1
    } days left.\n Expiry date: ${expiryDate.toISOString().substring(0, 10)}`;
  } else {
    return `${monthsLeft + 1} months left.\nExpiry date: ${expiryDate
      .toISOString()
      .substring(0, 10)}`;
  }
}
