export function useDateFormat(date) {
    const dateObject = new Date(date);
    const utcDate = dateObject.toUTCString().split(' ').slice(0, 4).join(' ')
    return utcDate
}