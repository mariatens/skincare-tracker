export function timeLeft(openedDate?: Date, months?: string, expiryDate?: string){
    if (expiryDate){  //if there is expiry date that means it hasn't been opened  
    const diffYears = new Date(expiryDate).getFullYear() - new Date().getFullYear();
    const diffMonths = new Date(expiryDate).getMonth() - new Date().getMonth() + (12 * diffYears);
    return diffMonths
    }
    if (months && openedDate){
        const deadline = new Date(openedDate).getMonth() + parseInt(months)
        const timeLeft = deadline - new Date().getMonth() //time difference between deadline and today
        return timeLeft
    }
}
