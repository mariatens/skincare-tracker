export function timeLeftUnOpened(openedDate: string, expiryDate: string): number { 
    const diffYears = new Date(expiryDate).getFullYear() - new Date().getFullYear();
    const diffMonths = new Date(expiryDate).getMonth() - new Date().getMonth() + (12 * diffYears);
    return diffMonths
    }
