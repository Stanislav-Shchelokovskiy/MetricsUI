export function toDate(isoDate: string | undefined): Date | undefined {
    if (isoDate) {
        const d = new Date(isoDate)
        d.setHours(0, 0, 0, 0)
        return d
    }
    return undefined
}
