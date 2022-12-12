export function daysLeft(date: Date, months: string){
        const now: Date = new Date(date);
        const monthsFromNow: Date = new Date(date);
        monthsFromNow.setMonth(now.getMonth() + parseInt(months));
      
        const oneDay = 24 * 60 * 60 * 1000;
        const daysUntilMonthsPass = Math.round(Math.abs((now.getTime() - monthsFromNow.getTime()) / oneDay));
      
        return daysUntilMonthsPass;
      }