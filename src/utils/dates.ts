import { format, parse } from 'date-fns'

export const getDisplayDate = (date?: Date | string) => {
    if (!date) {
        return ''
    }
    return new Date(date).toDateString()
}

export const getDateWithTime = (date: string | Date) => {
    const parsedDate =
        typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date()) : date
    return format(parsedDate, 'yyyy-MM-dd')
}
