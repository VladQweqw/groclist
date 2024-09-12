export function convertTime(time: string) {
    const date = new Date(time)

    const hours = date.getHours().toString().padEnd(2, '0')
    const minutes = date.getMinutes().toString().padEnd(2, '0')
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth()

    const months = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    function toString() {
        return `${hours}:${minutes}, ${day} ${months[month]} ${year}`
    }

    return {
        hours,
        minutes,
        day,
        year,
        month,
        toString,
    }
}

export function saveToLocal(key: string, value: any) {
    if (typeof window !== 'undefined') {
        return localStorage.setItem(key, JSON.stringify(value))
    }
}

export function getFromLocal(key: string) {

    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key)
        if (data != 'undefined') {
            return JSON.parse(data as any)
        }

        return null
    }
}