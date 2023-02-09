import { differenceInDays } from 'date-fns';
import { differenceInMonths } from 'date-fns';

export function calculateTimeLeftClosedProducts(expiryDate: string): string {
  const diffMonths = differenceInMonths(new Date(expiryDate), new Date());
  if (diffMonths < 1) {
    return `${
      differenceInDays(new Date(expiryDate), new Date()) + 1
    } days left. \n Expiry date: ${expiryDate}`;
  } else {
    return `${diffMonths + 1} months left. \nExpiry date: ${expiryDate}`;
  }
}
