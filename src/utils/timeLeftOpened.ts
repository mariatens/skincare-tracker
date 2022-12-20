import { addMonths, differenceInDays, differenceInMonths } from "date-fns";

export function timeLeftOpened(openedDate: string, months: string): string {
  const expiryDate = addMonths(new Date(openedDate), parseInt(months));
  const monthsLeft = differenceInMonths(new Date(expiryDate), new Date());
  if (monthsLeft < 1) {
    return `${differenceInDays(
      new Date(expiryDate),
      new Date()
    )} days left. Expiry date: ${expiryDate.toISOString().substring(0, 10)}`;
  } else {
    return `${monthsLeft} months left. Expiry date: ${expiryDate
      .toISOString()
      .substring(0, 10)}`;
  }
}
