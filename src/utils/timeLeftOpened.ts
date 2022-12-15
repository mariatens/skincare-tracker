export function timeLeftOpened(openedDate: string, months: string): number{ 
        const deadline = new Date(openedDate).getMonth() + parseInt(months)
        const timeLeft = deadline - new Date().getMonth() //time difference between deadline and today in months
        return timeLeft
}
