import { differenceInDays } from 'date-fns';
import { differenceInMonths } from 'date-fns';

export function timeLeftUnopened(expiryDate: string): string {
  const diffMonths = differenceInMonths(new Date(expiryDate), new Date());
  if (diffMonths < 1) {
    return `${differenceInDays(
      new Date(expiryDate),
      new Date()
    )} days left. Expiry date: ${expiryDate}`;
  } else {
    return `${diffMonths} months left. Expiry date: ${expiryDate}`;
  }
}
